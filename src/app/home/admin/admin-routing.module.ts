import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CustomerComponent } from './customer/customer.component';
import { TripComponent } from './trip/trip.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [

  { path:'',component: HomeComponent
  },

  { path:'calendar',component: CalendarComponent
  },

  { path:'customer',component: CustomerComponent
  },

  { path:'trip',component: TripComponent
  },

  { path:'schedule',component: ScheduleComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
