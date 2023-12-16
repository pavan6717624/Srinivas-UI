import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private service: ServiceService) { }

  isLogggedIn() {
    return !!localStorage.getItem('token');
  }

  getRole() {

    let jwt = localStorage.getItem('token') || '';

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)




    return decodedJwtData.Role;
  }

  getUserName() {

    let jwt = localStorage.getItem('token') || '';

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)


    return decodedJwtData.sub;
  }

}
