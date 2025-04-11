import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
import { LocationDTO } from '../trip/trip.component';
import { DatePipe } from '@angular/common';

export class TripDTO {
  locationName: string = "";
  toDate: Date = new Date();
  fromDate: Date = new Date();
  status: boolean = false;
  message: string = '';
}

export class ScheduleDTO {
  locationName: string = "";
  toDate: Date = new Date();
  fromDate: Date = new Date();
  tripDates: string = '';
  name: string = '';
  mobile: string = '';
  email: string = '';
  udetails: string = '';

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
  customerVisible = false;

  locations: LocationDTO[] = [];
  trips: TripDTO[] = [];
  originaltrips: TripDTO[] = [];

  locationNameSelected: string = '';

  tripSelected: string = '';

  name: string = '';

  mobile: string = '';

  emailId: string = '';

  showCustomerAdd(name: string, fromDate: Date, toDate: Date) {
    this.locationNameSelected = name;
    this.tripSelected = fromDate + " to " + toDate;
    this.customerVisible = true;
  }
  addCustomer() {

    if(this.selectedCustomer!=null)
    {

    this.messageService.clear();
    this.confirmationService.close();
    this.confirmationService.confirm({
      message: 'Do you want to Add Customer to Trip <br/> Name : ' + 
      this.selectedCustomer.name.split("-")[0].trim() + '<br/> Mobile : ' + 
      this.selectedCustomer.name.split("-")[1].trim() + '<br/> Location: ' + 
      this.locationNameSelected +'<br/> Schedule : '+
      this.tripSelected,
      header: 'Trip Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {

         this.addCustomerToTrip();

      },
      reject: () => {

      }
    });
  }
  else
  {
    this.messageService.clear();
    this.confirmationService.close();
    this.messageService.add({ severity: 'error', summary: 'Please select valid Customer', detail: '' });
    this.customerVisible=false;
  }
  }
  addCustomerToTrip() {

    var scheduleDTO= new ScheduleDTO();
    scheduleDTO.locationName=this.locationNameSelected;
    scheduleDTO.tripDates=this.tripSelected;
    scheduleDTO.mobile=this.selectedCustomer.name.split("-")[1].trim();

    this.loading=true;

    this.service.addSchedule(scheduleDTO).subscribe(
      (res: any) => {
        console.log(res);

        this.messageService.clear();
        this.customerVisible=false;

        //this.listVisible=true;
        this.messageService.add({ severity: 'info', summary: res.message, detail: '' });

        // this.getTrips();

        this.loading = false;

      },
      (err: any) => {
        this.customerVisible=false;
        this.loading = false;

      }
    );

  }
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

  add() {
    if (this.selectedLocation != null && this.selectedLocation.name.trim().length > 0 && this.rangeDates != null && this.rangeDates[0] != null && this.rangeDates[1] != null) {
      this.messageService.clear();
      this.confirmationService.close();
      this.confirmationService.confirm({
        message: 'Do you want to Add the Trip',
        header: 'Trip Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {

          this.addTrip();

        },
        reject: () => {

        }
      });
    }
    else {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Invalid Parameters..', detail: '' });

    }
  }
  addTrip() {


    if (this.rangeDates[0] < new Date()) {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Trip cannot be with old dates', detail: '' });
      return;
    }

    var tripDTO = new TripDTO();
    tripDTO.locationName = this.selectedLocation.name;
    tripDTO.fromDate = this.rangeDates[0];
    tripDTO.fromDate.setDate(tripDTO.fromDate.getDate() + 1);
    tripDTO.toDate = this.rangeDates[1];
    tripDTO.toDate.setDate(tripDTO.toDate.getDate() + 1);
    this.loading = true;
    this.service.addTrip(tripDTO).subscribe(
      (res: any) => {
        console.log(res);

        this.messageService.clear();

        //this.listVisible=true;
        this.messageService.add({ severity: 'info', summary: res.message, detail: '' });

        this.getTrips();

        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );

  }
  filter() {

    this.trips = this.originaltrips.filter(o => this.checkFilter(o));

  }

  checkFilter(t: TripDTO) {




    var fromDate = new DatePipe('en-US').transform(this.rangeDates[0], 'yyyy-MM-dd') + "";
    var toDate = new DatePipe('en-US').transform(this.rangeDates[1], 'yyyy-MM-dd') + "";

    return (this.selectedLocation != null && (t.locationName === this.selectedLocation.name || this.selectedLocation.name == null || this.selectedLocation.name == '')) ||
      ((fromDate >= t.fromDate + "" && fromDate <= t.toDate + "")
        || (toDate >= t.fromDate + "" && toDate <= t.toDate + ""));


  }

  removeFilter() {
    this.selectedLocation = new DropDown();
    this.rangeDates = [];
    this.trips = this.originaltrips;
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

  customers: DropDown[] = [];
  selectedCustomer: DropDown = new DropDown();
  getCustomersDropDown() {


    this.loading = true;


    this.service.getCustomersDropDown().subscribe(
      (res: any) => {
        this.customers = res;
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
        this.originaltrips = res;
        this.getCustomersDropDown();

        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }




}
