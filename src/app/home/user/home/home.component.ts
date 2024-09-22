import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today= new Date();

  ngOnInit() {
   
    
  }
  checkDate(date: any)
  {
    var newDate=new Date();
    newDate.setDate(date.day);
    newDate.setMonth(date.month);
    newDate.setFullYear(date.year);
    return newDate < this.today ;
  }

  constructor(private eventService: ServiceService) { }


}
