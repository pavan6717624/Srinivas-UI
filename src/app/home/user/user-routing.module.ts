import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../user/home/home.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [

  { path:'',component: HomeComponent,



    children: [
      { path:'',component: CustomerComponent},
      // { path:'customer',component: CustomerComponent},
      ]
  
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
