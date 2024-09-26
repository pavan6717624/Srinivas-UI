import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginStatus, SubscriptionDTO } from 'src/app/login/login.component';
declare var Razorpay: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today= new Date();
  goaSelected=true;
  bangkokSelected=true;
  location: string = '';
  dates: string = '';

  payVisible=false;

  ngOnInit() {
   
    this.getOrderId();
    this.getLoginDetails();
    
  }
  loginStatus: LoginStatus = new LoginStatus();
  loading=false;
  mobile: string ='';

  getLoginDetails() {


    this.loading = true;
    this.service.getLoginDetails().subscribe(
      (res: any) => {
        
        this.loginStatus = res;
        console.log(this.loginStatus);
        this.loading=false;
        this.name=res.name;
        this.email=res.email;
        this.mobile=res.mobile;
       

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }



  payCall()
  {
    this.payVisible=true;
  }

  checkDate(date: any)
  {
    var newDate=new Date();
    newDate.setDate(date.day);
    newDate.setMonth(date.month);
    newDate.setFullYear(date.year);
    return newDate < this.today ;
  }

  isMobile = false;
  sidebarVisible = false;
  constructor(private deviceService: DeviceDetectorService, private service: ServiceService, private messageService: MessageService) {

    this.isMobile = this.deviceService.isMobile(); 



  }

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

  name:string='';
  email: string='';




  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {

    var subscription = new SubscriptionDTO();
    subscription.razorpay_payment_id = event.detail.razorpay_payment_id;
    subscription.razorpay_order_id = event.detail.razorpay_order_id;
    subscription.razorpay_signature = event.detail.razorpay_signature;
    subscription.name = this.name;
    
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
