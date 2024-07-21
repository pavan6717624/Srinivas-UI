import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/share/share.module';
import { CustomerComponent } from './customer/customer.component';


@NgModule({
  declarations: [
    HomeComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
