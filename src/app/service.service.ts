import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Signup } from './login/login.component';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  getOrderId() {
    return this.http.get( 'https://take-app-4afe487d41cd.herokuapp.com/getOrderId' );
  }

  sendOTP(formData: FormData) {
    return this.http.post( 'http://localhost:8082/sendOTP',formData );
  }

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
