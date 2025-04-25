import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
import { distinct } from 'rxjs/operators';
import { from } from 'rxjs';
import { DropDown, ScheduleDTO } from '../schedule/schedule.component';
declare var FullCalendar: any;

export class CalendarDTO {
  name: string = '';
  mobile: string = '';
  email: string = '';
  udetails: string = '';
  locationName: string = '';
  fromDate: string = '';
  toDate: string = '';
  tripDates: string = '';
  message: string = '';
  status: boolean = false;
  customers: string = '';
  customerDetails: string = '';
}

export class EventDTO {
  title: string = '';
  id: string = '';
  start: string = '';
  end: string = '';
  backgroundColor: string = '';
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  toHome() {
    this.router.navigate(['home/admin/']);

  }
  scheduleVisible = false;

  loading = false;

  calendarData: CalendarDTO[] = [];

  eventDTO: EventDTO[] = [];

  customers: string[] = [];

  originalCustomers: string[]=[];

  getSchedules() {

    this.calendarData = [];

    this.eventDTO = [];



    this.loading = true;


    this.service.getSchedules().subscribe(
      (res: any) => {
        console.log(res);
        this.calendarData = res;

        console.log("thjis si " + this.calendarData);

        const users$ = from(this.calendarData);
        var lnames: string[] = [];

        users$.pipe(distinct(user => user.locationName)).subscribe(user => lnames.push(user.locationName));;

        console.log(lnames);

        var colors = ["orange", "blue", "purple", "brown", "grey"];

        for (var i = 0; i < this.calendarData.length; i++) {
          var event = new EventDTO();
          event.start = this.calendarData[i].fromDate;
          event.id = i + "";
          event.end = this.calendarData[i].toDate;
          event.title = this.calendarData[i].locationName + " - " + this.calendarData[i].customers + " Customers ";
          event.backgroundColor = colors[lnames.findIndex(name => this.calendarData[i].locationName == name)];
          this.eventDTO.push(event);

        }


        this.calendarUpdate();
        //this.loading = false;
        this.getCustomersDropDown();
        
        if(this.selectedInfo)
        this.calendarClick(this.selectedInfo);

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }
  items: MenuItem[] = [];

  constructor(private router: Router, private service: ServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) {


  }

  calendarUpdate() {
    const calendarEl = document.getElementById('calendar');

    console.log(this.eventDTO);

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      titleFormat: { // 🔥 This changes the month name format
        year: 'numeric',
        month: 'short' // short = "Jan", "Feb", etc.
      },
      events: this.eventDTO,
      eventClick: (info: any) => {
        this.selectedInfo = info;
        this.calendarClick(info);
      }



    });

    calendar.render();
  }

  selectedInfo: any;

  locationNameSelected: string = '';

  tripSelected: string = '';

   getUpdate() {
     this.getSchedules();

  
  }

  removeFromTrip(customer: string) {
    this.loading = true;
    var formData = new FormData();
    formData.set("locationName", this.locationNameSelected);
    formData.set("trip", this.tripSelected);
    formData.set("customer", customer);

    this.service.removeFromTrip(formData).subscribe(
      (res: any) => {
        console.log(res);

        if (res) {
          this.messageService.clear();
          this.confirmationService.close();
          this.messageService.add({ severity: 'info', summary: 'Removed Customer from Trip', detail: '' });
          this.getUpdate();
        }
        else {
          this.messageService.clear();
          this.confirmationService.close();
          this.messageService.add({ severity: 'error', summary: 'Cannot Remove Customer from Trip', detail: '' });
        }



        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );


  }
  customerAddVisible = false;

  refresh()
  {
    this.ngOnInit();
  }
 
  getCustomersDropDown() {


    this.loading = true;


    this.service.getCustomersDropDown().subscribe(
      (res: any) => {
        this.dcustomers = res;
        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }

  addCustomer() {

    console.log(this.selectedCustomer);

    if (this.selectedCustomer != null) {

      this.messageService.clear();
      this.confirmationService.close();
      this.confirmationService.confirm({
        message: 'Do you want to Add Customer to Trip <br/> Name : ' +
          this.selectedCustomer.name.split("-")[0].trim() + '<br/> Mobile : ' +
          this.selectedCustomer.name.split("-")[1].trim() + '<br/> Location: ' +
          this.locationNameSelected + '<br/> Schedule : ' +
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
    else {
      this.messageService.clear();
      this.confirmationService.close();
      this.messageService.add({ severity: 'error', summary: 'Please select valid Customer', detail: '' });
      this.customerVisible = false;
    }
  }
  addCustomerToTrip() {

    this.loading = true;

    var scheduleDTO = new ScheduleDTO();
    scheduleDTO.locationName = this.locationNameSelected;
    scheduleDTO.tripDates = this.tripSelected;
    scheduleDTO.mobile = this.selectedCustomer.name.split("-")[1].trim();

    this.service.addSchedule(scheduleDTO).subscribe(
      (res: any) => {
        console.log(res);

        this.messageService.clear();

        //this.listVisible=true;
        this.messageService.add({ severity: 'info', summary: res.message, detail: '' });

        // this.getTrips();

        this.customerAddVisible = false;

        this.getUpdate();

        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );

  }


  selectedCustomer: DropDown = new DropDown();

  dcustomers: DropDown[] = [];

  // refresh() {
  //   this.getSchedules();
  //   this.calendarClick(this.selectedInfo);
  // }
searchWord: string = '';
clear()
{
 // alert('asdfasdf');
  this.customers=this.originalCustomers;
  this.searchWord='';
  this.iconSearch='search';
}

  onSearch() {
    this.customers = this.originalCustomers.filter(o => o.toLowerCase().indexOf(this.searchWord.toLowerCase()) != -1)
    this.iconSearch='times';
  }


  calendarClick(info: any) {
    this.scheduleVisible = true;


    this.locationNameSelected = this.calendarData[Number(info.event.id)].locationName;
    this.tripSelected = this.calendarData[Number(info.event.id)].fromDate + " to " + this.calendarData[Number(info.event.id)].toDate;

    if (this.calendarData[Number(info.event.id)].customerDetails)
      {
        this.customers = this.calendarData[Number(info.event.id)].customerDetails.split(",");
        this.originalCustomers = this.calendarData[Number(info.event.id)].customerDetails.split(",");
      }
    else
      {
        this.customers = [];
        this.originalCustomers=[];
      }
      this.iconSearch='search';
  }

  iconSearch='search';

  ngAfterViewInit(): void {

  }

  tripVisible = false;

  locationVisible = false;

  customerVisible = false;

  ngOnInit(): void {

    this.getSchedules();



    this.items = [
      {
        label: 'Location',
        command: () => {
          this.messageService.clear(); this.confirmationService.close();
          this.locationVisible = true;
        }
      },
      {
        label: 'Trip',
        command: () => {
          this.messageService.clear(); this.confirmationService.close();
          this.tripVisible = true;
        }
      },
      {
        label: 'Customer',
        command: () => {
          this.messageService.clear(); this.confirmationService.close();
          this.customerVisible = true;
        }
      },



    ];


  }

}
