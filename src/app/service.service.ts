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
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/login',login);
  }

  signUp(signup: Signup)
  {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/signup',signup);
  }

  getLoginDetails() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/getLoginDetails')
  }

  getCategories() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/getCategories')
  }

  getCategory() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/getCategory')
  }

  getSubCategories(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/getSubCategories',formData)
  }


}
