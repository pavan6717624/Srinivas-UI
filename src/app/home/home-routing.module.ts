import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [

  { path:'',component: HomeComponent,



  children: [
    { path: '', component: ContentComponent },
    { path: 'images', component: ContentComponent },
    { path: 'videos', component: VideosComponent },
  ]


},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
