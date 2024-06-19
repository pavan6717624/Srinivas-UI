import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-facebook-signup',
  templateUrl: './facebook-signup.component.html',
  styleUrls: ['./facebook-signup.component.css']
})
export class FacebookSignupComponent implements OnInit {

  accessToken: string = "";
  formData = new FormData();
  constructor(private service: HomeService, private router: Router, private confirmationService: ConfirmationService) {

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
  loading = true;
  facebookSignup() {
    this.formData.set("category", localStorage.getItem("category") + "");
    this.formData.set("role", localStorage.getItem("role") + "");
    this.service.facebookSignup(this.formData).subscribe(
      (res: any) => {

        if (res.loginStatus) {

          this.router.navigate(['success']);

        }
        else {
          this.loading = false;
          this.confirmationService.confirm({
            message: 'Signup Failed. ' + res.message,
            header: 'Signup Failed',
            acceptLabel: 'Login Page',
            rejectVisible: false,
            icon: 'pi pi-times',
            acceptIcon: 'pi pi-user',
            accept: () => {
              this.loading = true;
              this.router.navigate(['login']);
            },
            reject: () => { }
          });


        }

      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.confirmationService.confirm({
          message: 'Signup Failed. ',
          header: 'Signup Failed',
          acceptLabel: 'Login Page',
          rejectVisible: false,
          icon: 'pi pi-times',
          acceptIcon: 'pi pi-user',
          accept: () => {
            this.loading = true;
            this.router.navigate(['login']);
          },
          reject: () => { }
        });


      }
    );
  }

}
