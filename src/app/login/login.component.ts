import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServiceService } from '../service.service';
export class Login {
  mobile: string = '';
  password: string = '';
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




  ngOnInit(): void {
  }

  loading: boolean = false;
  loginStatus: LoginStatus = new LoginStatus();
  loginOrSingup() {

    if (this.isLogin) {
      var login = new Login();
      login.mobile = this.mobile + "";
      login.password = this.password;

      console.log(login);
      this.loading = true;
      this.service.login(login).subscribe(
        (res: any) => {
          // if (res)
          //   this.router.navigate(['home']);
          // else {
          //   this.loading = false;
          //   console.log("login faield");
          //   this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: '' });
          // }


        this.loginStatus = res; 
        console.log(res);
        if (this.loginStatus.loginStatus) {
       
        let tokenStr= 'Bearer '+this.loginStatus.jwt;
        localStorage.setItem('token', tokenStr);

        this.router.navigate(['home'],  { state: {loginStatus: res }}); 
        }
        else {
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
    else {

      var signup = new Signup();
      signup.name = this.name;
      signup.email = this.email;
      signup.mobile = this.mobile + "";
      signup.password = this.password;

      console.log(signup);

      this.loading = true;
      this.service.signUp(signup).subscribe(
        (res: any) => {
          if (res)
            this.router.navigate(['success']);
            else
            {
              this.loading = false;
              console.log("SignUp faield");
              this.messageService.add({ severity: 'error', summary: 'SignUp Failed', detail: '' });
            }
        },
        (err) => { console.log(err + " Error"); this.loading = false; }
      );

    }

  }

}