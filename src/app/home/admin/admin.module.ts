import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/share/share.module';
import { TripComponent } from './trip/trip.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CustomerComponent } from './customer/customer.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    HomeComponent,
    TripComponent,
    ScheduleComponent,
    CustomerComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
