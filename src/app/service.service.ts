import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Signup } from './login/login.component';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  login(login: Login)
  {
    return this.http.post('https://takeoff-pavan.herokuapp.com/Heidigi/login',login);
  }

  signUp(signup: Signup)
  {
    return this.http.post('https://takeoff-pavan.herokuapp.com/Heidigi/signup',signup);
  }
}
