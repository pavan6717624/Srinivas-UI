import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { FacebookintegrationComponent } from './facebookintegration/facebookintegration.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate:[AuthguardGuard], data: { roles: ['Customer','Designer'] } },
  {path: 'success', component: SuccessComponent},
  {path: 'facebookIntegration', component: FacebookintegrationComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
