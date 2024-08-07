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
    return this.http.post('https://srinivas-app-23722fde5f1f.herokuapp.com/login',login);
  }

  generateOTP(formData: FormData)
  {
    return this.http.post('https://srinivas-app-23722fde5f1f.herokuapp.com/generateOTP',formData);
  }

  getLoginDetails() {
    return this.http.get('https://srinivas-app-23722fde5f1f.herokuapp.com/getLoginDetails')
  }

  

}
