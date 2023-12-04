import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { DesignerComponent } from './designer/designer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { StartComponent } from './start/start.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [

  { path:'',component: HomeComponent,



  children: [
    { path: '', component: StartComponent },
    { path: 'images', component: ContentComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'designer', component: DesignerComponent },
  ]


},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
