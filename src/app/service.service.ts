import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Signup } from './login/login.component';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  getOrderId() {
    return this.http.get( 'http://localhost:8081/JOLLY/getOrderId' );
  }

  sendOTP(formData: FormData) {
    return this.http.post( 'http://localhost:8081/JOLLY/sendOTP',formData );
  }

  verifyOTP(formData: FormData) {
    return this.http.post( 'http://localhost:8081/JOLLY/verifyOTP',formData );
  }

  signin(signUp: Signup) {
    return this.http.post( 'http://localhost:8081/JOLLY/signup',signUp );
  }

  constructor(private http: HttpClient) { }
  

  login(login: Login)
  {
    return this.http.post('http://localhost:8081/JOLLY/login',login);
  }

  generateOTP(formData: FormData)
  {
    return this.http.post('http://localhost:8081/JOLLY/generateOTP',formData);
  }

  getLoginDetails() {
    return this.http.get('http://localhost:8081/JOLLY/getLoginDetails')
  }

  

}
