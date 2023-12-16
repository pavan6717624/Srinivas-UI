import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from '../shared/authguard.guard';
import { ContentComponent } from './content/content.component';

import { DesignerComponent } from './designer/designer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { StartComponent } from './start/start.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [

  { path:'',component: HomeComponent,



  children: [

    { path: '', component: StartComponent, canActivate:[AuthguardGuard], data: { roles: ['Customer','Designer'] } },
    { path: 'start', component: StartComponent, canActivate:[AuthguardGuard], data: { roles: ['Customer','Designer'] } },
    
    { path: 'images', component: ContentComponent, canActivate:[AuthguardGuard], data: { roles: ['Customer','Designer'] } },
    { path: 'videos', component: VideosComponent, canActivate:[AuthguardGuard], data: { roles: ['Customer','Designer'] } },
    { path: 'designer', component: DesignerComponent, canActivate:[AuthguardGuard], data: { roles: ['Customer','Designer'] } },
  ]


},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
