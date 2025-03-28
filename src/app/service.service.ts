import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Signup } from './login/login.component';
import { LocationDTO } from './home/admin/trip/trip.component';
import { TripDTO } from './home/admin/schedule/schedule.component';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  getOrderId() {
    return this.http.get( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/getOrderId' );
  }

  sendOTP(formData: FormData) {
    return this.http.post( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/sendOTP',formData );
  }

  verifyOTP(formData: FormData) {
    return this.http.post( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/verifyOTP',formData );
  }

  signin(signUp: Signup) {
    return this.http.post( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/signup',signUp );
  }

  addLocation(locationDTO: LocationDTO) {
    return this.http.post( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/addLocation',locationDTO );
  }

  addTrip(tripDTO: TripDTO) {
    return this.http.post( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/addTrip',tripDTO );
  }

 editLocation(locationDTO: LocationDTO) {
    return this.http.post( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/editLocation',locationDTO );
  }

 deleteLocation(formData: FormData) {
    return this.http.post( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/deleteLocation',formData );
  }

  getLocations() {
    return this.http.get( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/getLocations');
  }

  getTrips() {
    return this.http.get( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/getTrips');
  }

  getLocationDropDown() {
    return this.http.get( 'https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/getLocationDropDown');
  }
  constructor(private http: HttpClient) { }


  login(login: Login)
  {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/login',login);
  }

  generateOTP(formData: FormData)
  {
    return this.http.post('https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/generateOTP',formData);
  }

  getLoginDetails() {
    return this.http.get('https://heidigi-app-38b2318c83b0.herokuapp.com/JOLLY/getLoginDetails')
  }

  

}
