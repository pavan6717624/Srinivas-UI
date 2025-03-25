import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
import { LocationDTO } from '../trip/trip.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private service: ServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

loading=false;


locations: LocationDTO[] = [];

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {


    this.loading = true;


    this.service.getLocationDropDown().subscribe(
      (res: any) => {
        this.locations = res;


        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }

}
