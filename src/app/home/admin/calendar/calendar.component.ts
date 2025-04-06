import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
import { distinct } from 'rxjs/operators';
import { from } from 'rxjs';
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

  getSchedules() {
    this.loading = true;


    this.service.getSchedules().subscribe(
      (res: any) => {
        console.log(res);
        this.calendarData = res;

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
        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }
  items: MenuItem[] = [];

  constructor(private router: Router, private service: ServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) {

    this.getSchedules();
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
        this.calendarClick(info);
      }



    });

    calendar.render();
  }

  calendarClick(info: any) {
    this.scheduleVisible = true;
    console.log(info.event.id);
    console.log(this.calendarData);
    if (this.calendarData[Number(info.event.id)].customerDetails)
      this.customers = this.calendarData[Number(info.event.id)].customerDetails.split(",");
    else
      this.customers = [];
  }

  ngAfterViewInit(): void {

  }

  tripVisible = false;

  locationVisible = false;

  customerVisible = false;

  ngOnInit(): void {

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
