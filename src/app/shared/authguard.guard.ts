import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const allowedRoles = route.data['roles'] as Array<string>;

      console.log("In Auth Guard");

      
    if (this.auth.isLogggedIn()) {
       return allowedRoles.includes(this.auth.getRole());
    }
    else {
      this.route.navigate(['/login']);
      return false;
    }
  }

}
