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
    return this.http.post( 'https://take-app-4afe487d41cd.herokuapp.com/sendOTP',formData );
  }

  verifyOTP(formData: FormData) {
    return this.http.post( 'https://take-app-4afe487d41cd.herokuapp.com/verifyOTP',formData );
  }

  signin(signUp: Signup) {
    return this.http.post( 'https://take-app-4afe487d41cd.herokuapp.com/signup',signUp );
  }

  constructor(private http: HttpClient) { }

  login(login: Login)
  {
    return this.http.post('https://take-app-4afe487d41cd.herokuapp.com/login',login);
  }

  generateOTP(formData: FormData)
  {
    return this.http.post('https://take-app-4afe487d41cd.herokuapp.com/generateOTP',formData);
  }

  getLoginDetails() {
    return this.http.get('https://take-app-4afe487d41cd.herokuapp.com/getLoginDetails')
  }

  

}
