import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private deviceService: DeviceDetectorService, private route: Router) { }
  menuItems = [{ label: 'Hi 9449840144!' }
    , { label: 'Profile', icon: 'pi pi-book', routerLink: 'about' },
  { label: 'Contact Us', icon: 'pi pi-phone', routerLink: 'contact' },
  { label: 'Logout', icon: 'pi pi-power-off', routerLink: '/login' }];
  isMobile = false;
  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  toHome() {
    this.route.navigate(['home']);
  }

}
