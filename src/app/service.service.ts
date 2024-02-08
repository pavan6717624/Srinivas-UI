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
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comlogin',login);
  }

  signUp(signup: Signup)
  {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comsignup',signup);
  }

  getLoginDetails() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.comgetLoginDetails')
  }

  getCategories() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.comgetCategories')
  }

  getCategory() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.comgetCategory')
  }

  getSubCategories(formData: FormData) {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.comgetSubCategories',formData)
  }


}
