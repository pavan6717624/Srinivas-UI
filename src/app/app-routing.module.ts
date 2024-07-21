import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { AuthguardGuard } from './shared/authguard.guard';
import { DemoComponent } from './demo/demo.component';



const routes: Routes = [
  {path: '', component: DemoComponent},
  {path: 'login', component: LoginComponent},
  
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[AuthguardGuard], data: { roles: ['Admin'] } },
  


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
