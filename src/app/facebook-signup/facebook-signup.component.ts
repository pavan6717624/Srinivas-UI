import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-facebook-signup',
  templateUrl: './facebook-signup.component.html',
  styleUrls: ['./facebook-signup.component.css']
})
export class FacebookSignupComponent implements OnInit {

  accessToken: string = "";
  formData = new FormData();
  constructor(private service: HomeService, private router: Router, private messageService: MessageService) {

    var url = window.location.href;
    var index1 = url.indexOf("=") + 1;
    var index2 = url.indexOf("&");
    this.accessToken = url.substring(index1, index2);
    console.log(this.accessToken);


    this.formData.set("accessToken", this.accessToken);

    this.facebookSignup();

  }

  ngOnInit(): void {
  }

  facebookSignup()
  {
    this.formData.set("category", localStorage.getItem("category")+"");
    this.formData.set("type", localStorage.getItem("type")+"");
    this.service.facebookSignup(this.formData).subscribe(
      (res: any) => {

        if (res.loginStatus) {

          let tokenStr = 'Bearer ' + res.jwt;
          localStorage.setItem('token', tokenStr);

          alert("login successful");

          //this.router.navigate(['home'], { state: { loginStatus: res } });

        }
        else {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Signup Failed' + res.message, detail: '' });

         // this.router.navigate(['login']);
        }

      },
      (err) => {
        console.log(err + " Error");
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Signup Failed', detail: '' });
       // this.router.navigate(['login']);

      }
    );
  }

}
