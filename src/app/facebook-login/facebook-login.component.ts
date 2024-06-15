import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit {

  accessToken: string = "";
  formData = new FormData();
  constructor(private service: HomeService, private router: Router, private messageService: MessageService) {

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

  checkFacebookDetails() {


    this.service.checkFacebookDetails(this.formData).subscribe(

      (res: any) => {

        alert(res);
      },
      (err: any) => { alert(err); console.log(err) }

    );

  }



  facebookLogin() {
    this.service.facebookLogin(this.formData).subscribe(
      (res: any) => {

        if (res.loginStatus) {

          let tokenStr = 'Bearer ' + res.jwt;
          localStorage.setItem('token', tokenStr);


          this.router.navigate(['home'], { state: { loginStatus: res } });

        }
        else {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: '' });

          this.router.navigate(['login']);
        }

      },
      (err) => {
        console.log(err + " Error");

      }
    );

  }
}
