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
    return this.http.post('http://localhost:8082/login',login);
  }

  generateOTP(formData: FormData)
  {
    return this.http.post('http://localhost:8082/generateOTP',formData);
  }

  getLoginDetails() {
    return this.http.get('http://localhost:8082/getLoginDetails')
  }

  

}
