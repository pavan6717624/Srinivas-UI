import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit {

  accessToken: string = "";
  formData = new FormData();
  constructor(private service: HomeService, private router: Router, private confirmationService: ConfirmationService) {

    var url = window.location.href;
    var index1 = url.indexOf("=") + 1;
    var index2 = url.indexOf("&");
    this.accessToken = url.substring(index1, index2);
    console.log(this.accessToken);


    this.formData.set("accessToken", this.accessToken);

    this.facebookLogin();

  }

  ngOnInit(): void {


  }

  

loading=true;

  facebookLogin() {
    this.service.facebookLogin(this.formData).subscribe(
      (res: any) => {

        if (res.loginStatus) {

          let tokenStr = 'Bearer ' + res.jwt;
          localStorage.setItem('token', tokenStr);


          this.router.navigate(['home'], { state: { loginStatus: res } });

        }
        else {
          this.loading = false;
          this.confirmationService.confirm({
            message: 'Login Failed. ' + res.message,
            header: 'Login Failed',
            acceptLabel: 'Login Page',
            rejectVisible: false,
            icon: 'pi pi-times',
            acceptIcon: 'pi pi-user',
            accept: () => {
              
              this.router.navigate(['login']);
            },
            reject: () => { }
          });
         
        }

      },
      (err) => {
        this.loading = false;
        this.confirmationService.confirm({
          message: 'Login Failed. ',
          header: 'Login Failed',
          acceptLabel: 'Login Page',
          rejectVisible: false,
          icon: 'pi pi-times',
          acceptIcon: 'pi pi-user',
          accept: () => {
            
            this.router.navigate(['login']);
          },
          reject: () => { }
        });
       
        console.log(err + " Error");

      }
    );

  }
}
