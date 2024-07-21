import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceService } from '../service.service';
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
}
export class Signup {
  mobile: string = '';
  password: string = '';
  name: string = '';
  email: string = '';
  role: string = '';
  category: string = '';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router, private messageService: MessageService) { }
  name: string = '';
  email: string = '';
  mobile: number | undefined;
  password: string = '';
  isLogin: boolean = true;
  ctype: string = 'Business';
  cpassword: string = '';
  getLoginDetails() {


    this.loading = true;
    this.service.getLoginDetails().subscribe(
      (res: any) => {
        this.loading = false;
        this.loginStatus = res;
        console.log(this.loginStatus);

        if (this.loginStatus.userType === 'Customer') {
          this.router.navigate(['home/start'], { state: { loginStatus: res } });
        }
        else if (this.loginStatus.userType === 'Designer') {
          this.router.navigate(['home/designer'], { state: { loginStatus: res } });

        }
        else if (this.loginStatus.userType === 'Admin') {
          this.router.navigate(['admin'], { state: { loginStatus: res } });

        }

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }
  header = 'Logging In...';
  generateOTP() {
    if ((this.mobile + "").trim().length != 10) {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Invalid Mobile Number Provided.', detail: '' });
      return;
    }

    if (this.isLogin) {

      var formData = new FormData();
      formData.set("mobile", this.mobile + '');


      this.loading = true;
      this.header = 'Sending OTP to Your Email...';
      this.service.generateOTP(formData).subscribe(
        (res: any) => {

          if (res) {
            this.messageService.clear();
            this.messageService.add({ severity: 'info', summary: 'OTP Sent to Your Registered Email.', detail: '' });
            this.otpView = true;
          }
          else {
            this.messageService.clear();
            this.messageService.add({ severity: 'error', summary: 'Not Registered Mobile Number...', detail: '' });
          }
          this.loading = false;
          this.header = 'Logging In...';
        },
        (err) => {
          console.log(err + " Error");
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Not Registered Mobile Number...', detail: '' });
          this.header = 'Logging In...';
          this.loading = false;
        }
      );
    }



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
  otpView = false;

  loginOrSingup() {


    if ((this.mobile + "").trim().length != 10) {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Invalid Mobile Number Provided.', detail: '' });
      return;
    }

    if (this.isLogin) {

      if (this.password == null || this.password.trim().length == 0) {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Invalid Password Provided.', detail: '' });
        return;
      }

      var login = new Login();
      login.mobile = this.mobile + "";
      login.password = this.password;

      console.log(login);
      this.loading = true;
      this.service.login(login).subscribe(
        (res: any) => {
      

          this.loginStatus = res;
          console.log(res);
          if (this.loginStatus.loginStatus) {

            let tokenStr = 'Bearer ' + this.loginStatus.jwt;
            localStorage.setItem('token', tokenStr);


            this.router.navigate(['admin'], { state: { loginStatus: res } });

          }
          else {
            this.messageService.clear();
            this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: '' });
            this.password = "";
            this.loading = false;
          }

        },
        (err) => {
          console.log(err + " Error");
          this.loading = false;
        }
      );
    }


  }

  

}
