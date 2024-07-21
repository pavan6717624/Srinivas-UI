import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../share/share.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    
    SharedModule
  ]
})
export class HomeModule { }
