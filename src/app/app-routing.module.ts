import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { AuthguardGuard } from './shared/authguard.guard';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate:[AuthguardGuard], data: { roles: ['Admin','User', 'Manager'] } },
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
