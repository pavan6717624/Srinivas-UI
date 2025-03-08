import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from '../shared/authguard.guard';
import { StartComponent } from './start/start.component';



const routes: Routes = [

  { path:'',component: HomeComponent,



  children: [
    { path:'',component: StartComponent},
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate:[AuthguardGuard], data: { roles: ['Customer'] } },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[AuthguardGuard], data: { roles: ['Admin'] } },
  ]


},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
