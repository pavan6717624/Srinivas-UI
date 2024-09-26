import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceService } from '../service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
declare var Razorpay: any;

export class SubscriptionDTO {
  password: string = "";
  refererid: string = "";
  name: string = "";
  contact: string = "";
  email: string = "";
  profession: string = "";
  gender: string = "";
  city: string = "";
  razorpay_payment_id: string = "";
  razorpay_order_id: string = "";
  razorpay_signature: string = "";
  message: string = "";
  executiveId: string = '';
  subscription: string = '';
}


export class Login {
  mobile: string = '';
  password: string = '';
}

export class DropDown {
  code: string = '';
  name: string = '';
}
export class LoginStatus {
  userId: string = "";
  userType: string = "";
  loginStatus: boolean = false;
  loginId: string = "";
  jwt: string = '';
  subscriptionType: string = '';
  name:string='';
  email: string='';
  mobile: string ='';
  

}
export class Signup {
  mobile: string = '';
  password: string = '';
  name: string = '';
  email: string = '';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isMobile = false;
  sidebarVisible = false;
  constructor(private deviceService: DeviceDetectorService, private service: ServiceService, private router: Router, private messageService: MessageService) {

    this.isMobile = this.deviceService.isMobile();
   



  }
  name: string = '';
  email: string = '';
  mobile: string = '';
  password: string = '';
  isLogin: boolean = true;
  ctype: string = 'Business';
  cpassword: string = '';
  loginVisible = false;
  activeIndex1 = 0;

  login(id: number) {
    this.loginVisible = true;
    this.activeIndex1 = id;
  }
  signOtpVisible = false;

  sendOTP() {
    this.clear();
    this.loading = true;
    var formData = new FormData();

    formData.set("mobile", this.mobile + "")

    this.service.sendOTP(formData).subscribe(

      (res: any) => {
        console.log(res);
        this.clear();
        // this.loginVisible=false;
        this.signOtpVisible = true;
        if (res)
          this.messageService.add({ severity: 'info', summary: 'Password Sent to your Email', detail: '' });
        else
          this.messageService.add({ severity: 'error', summary: "Error Occured...", detail: '' });


        this.loading = false;
      },
      (err: any) => {
        this.clear();
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error Occured...', detail: '' });
        this.loading = false;
      });
  }

  verifyOTP() {
    this.clear();
    if (!(this.mobile.trim().length == 10)) {

      this.messageService.add({ severity: 'error', summary: 'Invalid Mobile Number', detail: '' });
      return;
    }

    this.loading = true;
    var formData = new FormData();
    formData.set("mail", this.email + "");
    formData.set("mobile", this.mobile + "")
    formData.set("password", this.password + "");
    this.service.verifyOTP(formData).subscribe(

      (res: any) => {
        console.log(res);
        this.clear();
        if (res.loginStatus) {

          this.messageService.add({ severity: 'info', summary: 'Successful', detail: '' });
          this.signOtpVisible = false;
          this.loginVisible = false;
          let tokenStr = 'Bearer ' + res.jwt;
          localStorage.setItem('token', tokenStr);
          this.ngOnInit();
        }
        else
          this.messageService.add({ severity: 'error', summary: 'Wrong OTP Provided', detail: '' });



        this.loading = false;
      },
      (err: any) => {
        this.clear();
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error Occured...', detail: '' });
        this.signOtpVisible = false;
        this.loginVisible = false;
        this.loading = false;
      }
    );
  }

  signin() {
    this.clear();
    if (!(this.name.trim().length > 0 && this.mobile.trim().length == 10 && this.email.trim().length > 3)) {

      this.messageService.add({ severity: 'error', summary: 'Insufficient Details Provided.', detail: '' });
      return;
    }
    this.loading = true;

    var signUp = new Signup();
    signUp.email = this.email;
    signUp.name = this.name;
    // signUp.password=this.password;
    signUp.mobile = this.mobile;
    this.service.signin(signUp).subscribe(

      (res: any) => {
        console.log(res);
        this.clear();
        // this.loginVisible=false;
       
        if (res.loginStatus)
         {
          this.signOtpVisible = true;
         this.messageService.add({ severity: 'info', summary: 'Password Sent to your Email', detail: '' });
         }
        else
          this.messageService.add({ severity: 'error', summary: res.message, detail: '' });


        this.loading = false;
      },
      (err: any) => {
        this.clear();
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error occured while Signing up...', detail: '' });
        this.loading = false;
      });
  }

  getLoginDetails() {


    this.loading = true;
    this.service.getLoginDetails().subscribe(
      (res: any) => {
        
        this.loginStatus = res;
        console.log(this.loginStatus);

        if (this.loginStatus.userType === 'User') {
          this.router.navigate(['home/user'], { state: { loginStatus: res } });
        }
        
        else if (this.loginStatus.userType === 'Admin') {
          this.router.navigate(['home/admin'], { state: { loginStatus: res } });

        }
// this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }
  header = 'Please Wait...';

  clear() {
    this.messageService.clear();
  }

  ngOnInit(): void {
    console.log("liogin");
    this.getLoginDetails();


  }
  categories: DropDown[] = [];




  loading: boolean = false;
  type: string = 'password';
  icon: string = 'pi pi-eye-slash'
  loginStatus: LoginStatus = new LoginStatus();
  category: DropDown = new DropDown();
  otpView = true;


  goaSelected = false;
  bangkokSelected = false;

 

}
