import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Signup } from './login/login.component';
import { LocationDTO } from './home/admin/trip/trip.component';
import { ScheduleDTO, TripDTO } from './home/admin/schedule/schedule.component';
import { CustomerDTO } from './home/admin/customer/customer.component';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  getOrderId() {
    return this.http.get( 'https://pavan-jolly-418fae2030c9.herokuapp.com/getOrderId' );
  }

  sendOTP(formData: FormData) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/sendOTP',formData );
  }

  verifyOTP(formData: FormData) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/verifyOTP',formData );
  }

  removeFromTrip(formData: FormData) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/removeFromTrip',formData );
  }

  signin(signUp: Signup) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/signup',signUp );
  }

  addLocation(locationDTO: LocationDTO) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/addLocation',locationDTO );
  }

  addTrip(tripDTO: TripDTO) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/addTrip',tripDTO );
  }

  deleteTrip(tripDTO: TripDTO) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/deleteTrip',tripDTO );
  }

  addCustomer(cdto: CustomerDTO) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/addCustomer',cdto );
  }

  addSchedule(sdto: ScheduleDTO) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/addSchedule',sdto );
  }


  editCustomer(cdto: CustomerDTO) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/editCustomer',cdto );
  }

  deleteCustomer(cdto: CustomerDTO) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/deleteCustomer',cdto );
  }


 editLocation(locationDTO: LocationDTO) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/editLocation',locationDTO );
  }

 deleteLocation(formData: FormData) {
    return this.http.post( 'https://pavan-jolly-418fae2030c9.herokuapp.com/deleteLocation',formData );
  }

  getLocations() {
    return this.http.get( 'https://pavan-jolly-418fae2030c9.herokuapp.com/getLocations');
  }

  getSchedules() {
    return this.http.get( 'https://pavan-jolly-418fae2030c9.herokuapp.com/getSchedules');
  }

  getTrips() {
    return this.http.get( 'https://pavan-jolly-418fae2030c9.herokuapp.com/getTrips');
  }

  getCustomerTrips() {
    return this.http.get( 'https://pavan-jolly-418fae2030c9.herokuapp.com/getCustomerTrips');
  }

  getCustomers() {
    return this.http.get( 'https://pavan-jolly-418fae2030c9.herokuapp.com/getCustomers');
  }


  getLocationDropDown() {
    return this.http.get( 'https://pavan-jolly-418fae2030c9.herokuapp.com/getLocationDropDown');
  }

  
  getCustomersDropDown() {
    return this.http.get( 'https://pavan-jolly-418fae2030c9.herokuapp.com/getCustomersDropDown');
  }
  constructor(private http: HttpClient) { }


  login(login: Login)
  {
    return this.http.post('https://pavan-jolly-418fae2030c9.herokuapp.com/login',login);
  }

  generateOTP(formData: FormData)
  {
    return this.http.post('https://pavan-jolly-418fae2030c9.herokuapp.com/generateOTP',formData);
  }

  getLoginDetails() {
    return this.http.get('https://pavan-jolly-418fae2030c9.herokuapp.com/getLoginDetails')
  }

  

}
