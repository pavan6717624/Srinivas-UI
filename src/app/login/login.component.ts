import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
export class Login
{
  mobile: string='';
  password: string = '';
}
export class Signup
{
  mobile: string='';
  password: string = '';
  name: string='';
  email: string ='';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }
  name: string ='';
  email: string = '';
  mobile: number | undefined;
  password: string ='';
  isLogin: boolean=true;


  

  ngOnInit(): void {
  }

  loading: boolean = false;

  loginOrSingup()
  {

    if(this.isLogin)
    {
   var login=new Login();
   login.mobile=this.mobile+"";
   login.password=this.password;

   console.log(login);
      this.loading=true;
   this.service.login(login).subscribe(
     (res)=> {
      this.router.navigate(['home']);
this.loading=false;
     } ,
     (err)=> {
       console.log(err+" Error");
       this.loading=false;
     }
   );
    }
    else
    {
    
      var signup=new Signup();
      signup.name=this.name;
      signup.email=this.email;
      signup.mobile=this.mobile+"";
      signup.password=this.password;

   console.log(signup);
 
 this.loading=true;
   this.service.signUp(signup).subscribe(
     (res)=> { 

      if(res)
      this.router.navigate(['success']);
      this.loading=false;

     },
     (err)=> { console.log(err+" Error"); this.loading=false;}
   );

    }

  }

}
