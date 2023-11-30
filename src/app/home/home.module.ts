import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../share/share.module';
import { ContentComponent } from './content/content.component';
import { ProfileComponent } from './profile/profile.component';
import { FacebookComponent } from './facebook/facebook.component';
import { VideosComponent } from './videos/videos.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    ProfileComponent,
    FacebookComponent,
    VideosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
