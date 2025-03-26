import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
import { LocationDTO } from '../trip/trip.component';

export class TripDTO {
  locationName: string = "";
  toDate: Date = new Date();
  fromDate: Date = new Date();
  status: boolean = false;
  message: string = '';
}

export class DropDown {
  code: string = '';
  name: string = '';
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private service: ServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  loading = false;

  rangeDates: Date[] = [];

  date: Date = new Date();

  minDate: Date = new Date();

  maxDate: Date = new Date();


  locations: LocationDTO[] = [];
  trips: TripDTO[] = [];

  ngOnInit(): void {
    this.getLocations();


    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = today;
    this.maxDate = new Date();
    this.maxDate.setMonth(month);
    this.maxDate.setFullYear(nextYear);
    console.log(this.maxDate);
  }
  selectedLocation: DropDown = new DropDown();
  addTrip() {
    var tripDTO = new TripDTO();
    tripDTO.locationName = this.selectedLocation.name;
    tripDTO.fromDate = this.rangeDates[0];
    tripDTO.fromDate.setDate( tripDTO.fromDate.getDate() + 1 );
    tripDTO.toDate = this.rangeDates[1];
    tripDTO.toDate.setDate( tripDTO.toDate.getDate() + 1 );
    this.loading = true;
    this.service.addTrip(tripDTO).subscribe(
      (res: any) => {
        console.log(res);
this.getTrips();

        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }

  getLocations() {


    this.loading = true;


    this.service.getLocationDropDown().subscribe(
      (res: any) => {
        this.locations = res;

        this.getTrips();
        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }


  getTrips() {


    this.loading = true;


    this.service.getTrips().subscribe(
      (res: any) => {
        this.trips = res;


        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }


}
