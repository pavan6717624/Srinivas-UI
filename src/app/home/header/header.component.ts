import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private authSerivce: AuthService, private deviceService: DeviceDetectorService, private route: Router) { }

  sidebarVisible=false;

  ngOnInit(): void {
  }

  menuItems = [

    {
      label: 'Home', icon: 'pi pi-home', command: () => {
        this.sidebarVisible = false;
        this.route.navigate(['home/user']);
      }
    },

    {
      label: 'Book Now', icon: 'pi pi-images', command: () => {
        this.sidebarVisible = false;
        this.route.navigate(['home/user']);
      }
    },
    {
      label: 'My Bookings', icon: 'pi pi-youtube', command: () => {
        this.sidebarVisible = false;
        //alert("in progress")
        // this.route.navigate(['home/videos']);
      }
    },
    {
      label: 'Account', icon: 'pi pi-user', command: () => {
        this.sidebarVisible = false;
        //alert("in progress")
        // this.route.navigate(['home/profile']);
      }
    },
    
    {
      label: 'Logout', icon: 'pi pi-power-off', command: () => {
        localStorage.removeItem('token');
        this.route.navigate(['login']);
      }
    }];

}
