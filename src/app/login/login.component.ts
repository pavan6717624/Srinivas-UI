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

  isMobile = false;
  sidebarVisible = false;
  items: any;
  constructor(private deviceService: DeviceDetectorService, private service: ServiceService, private router: Router, private messageService: MessageService) {

    this.isMobile = this.deviceService.isMobile();
    this.getOrderId();

    this.items = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          // this.update();
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          // this.delete();
        }
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];

  }
  name: string = '';
  email: string = '';
  mobile: number | undefined = 9449840144;
  password: string = '';
  isLogin: boolean = true;
  ctype: string = 'Business';
  cpassword: string = '';
  loginVisible=false;
  activeIndex1=0;
login(id: number)
{
  this.loginVisible=true;
  this.activeIndex1=id;
}
otpVisible=false;
sendOTP()
{
  var formData=new FormData();
  formData.set("mail", this.email);
  this.service.sendOTP(formData).subscribe(

    (res: any) => {
      console.log(res);
      this.otpVisible=true;
    },
    (err: any) => {
      console.log(err);
    }
  );
}

  getLoginDetails() {


    this.loading = true;
    this.service.getLoginDetails().subscribe(
      (res: any) => {
        this.loading = false;
        this.loginStatus = res;
        console.log(this.loginStatus);

        if (this.loginStatus.userType === 'User') {
          this.router.navigate(['home/user'], { state: { loginStatus: res } });
        }
        else if (this.loginStatus.userType === 'Manager') {
          this.router.navigate(['home/manager'], { state: { loginStatus: res } });

        }
        else if (this.loginStatus.userType === 'Admin') {
          this.router.navigate(['home/admin'], { state: { loginStatus: res } });

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
  otpView = true;

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

            if (this.loginStatus.userType === 'User') {
              this.router.navigate(['home/user'], { state: { loginStatus: res } });
            }
            else if (this.loginStatus.userType === 'Manager') {
              this.router.navigate(['home/manager'], { state: { loginStatus: res } });

            }
            else if (this.loginStatus.userType === 'Admin') {
              this.router.navigate(['home/admin'], { state: { loginStatus: res } });

            }

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

  goaSelected = false;
  bangkokSelected = false;

  goaAmount = 100000;
  bangkokAmount = 150000;

  paymentAmountChange(id: number) {
    if (id == 1) {
      if (this.goaSelected)
        this.paymentAmount += this.goaAmount;
      else
        this.paymentAmount -= this.goaAmount;
    }

    if (id == 2) {
      if (this.bangkokSelected)
        this.paymentAmount += this.bangkokAmount;
      else
        this.paymentAmount -= this.bangkokAmount;
    }

  }
  paymentStart(id: number) {

    if (id == 1) {
      this.goaSelected = true;
      this.bangkokSelected = false;

    }
    else if (id == 2) {
      this.bangkokSelected = true;
      this.goaSelected = false;


    }
    else {
      this.goaSelected = false;
      this.bangkokSelected = false;

    }

    this.joinUsVisible = true
    this.paymentAmountChange(id);
  }
  joinUsVisible = false;
  paymentAmount = 0;
  openPayment() {
    //this.paying=true;
    var options = {
      // "key": "rzp_test_WJFhmfMmFRxETB", // Enter the Key ID generated from the Dashboard
      "key": "rzp_live_nWA6UVrzTQFr9W",
      // "amount": "100", 
      // "amount" : 119900,
      "amount": "100",
      "currency": "INR",
      "name": "Jolly Vacations",
      "description": "Join Us",
      "image": "https://jolly-20275.web.app/assets/images/jollylogo1.png",
      "handler": function (response: any) {
        var event = new CustomEvent("payment.success",
          {
            detail: response,
            bubbles: true,
            cancelable: true
          }
        );
        window.dispatchEvent(event);
      },

      "order_id": this.orderid,
      "prefill": {
        "name": this.name,
        "email": this.email,
        // "contact": this.contact
      },


      "notes": {
        "address": "Jolly Vacations Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      },
      "modal": {
        "ondismiss": function () {
          var event = new CustomEvent("payment.closed",
            {
              detail: "closed",
              bubbles: true,
              cancelable: true
            }
          );
          window.dispatchEvent(event);
        }
      }

    };

    const rzp = new Razorpay(options);

    rzp.open();

  }


  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {

    var subscription = new SubscriptionDTO();
    subscription.razorpay_payment_id = event.detail.razorpay_payment_id;
    subscription.razorpay_order_id = event.detail.razorpay_order_id;
    subscription.razorpay_signature = event.detail.razorpay_signature;
    subscription.name = this.name;
    subscription.password = this.password;

    subscription.subscription = 'Pay';

    console.log(subscription);

  }


  @HostListener('window:payment.closed', ['$event'])
  onPaymentClosed(event: any): void {
    console.log("failed");
  }

  orderid: any = "";
  getOrderId() {

    this.service.getOrderId().subscribe(
      (res: any) => { this.orderid = res.orderId; console.log(this.orderid); },
      (err: any) => { console.log("ASdfasdf"); }

    );

  }


}
