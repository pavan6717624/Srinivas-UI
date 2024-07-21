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
        this.route.navigate(['home']);
      }
    },

    {
      label: 'Images', icon: 'pi pi-images', command: () => {
        this.sidebarVisible = false;
        this.route.navigate(['home/images']);
      }
    },
    {
      label: 'Videos', icon: 'pi pi-youtube', command: () => {
        this.sidebarVisible = false;
        this.route.navigate(['home/videos']);
      }
    },
    {
      label: 'Profile', icon: 'pi pi-user', command: () => {
        this.sidebarVisible = false;
        this.route.navigate(['home/profile']);
      }
    },
    {
      label: '(Re) Integrate Facebook', icon: 'pi pi-facebook', command: () => {
        this.confirmationService.confirm({
          message: 'Do you want to (Re) Integrate your Facebook Page(s) with Heidigi?',
          header: 'Integration',
          rejectVisible: true,
          icon: 'pi pi-tags',
          accept: () => {
            // this.loading = true;
            //this.reIntegrate();
            // window.location.replace("https://www.facebook.com/v18.0/dialog/oauth?response_type=token&display=popup&client_id=1877295529003407&redirect_uri=https://client.heidigi.com/facebookIntegration&auth_type=rerequest&scope=pages_show_list%2Cpages_read_engagement%2Cpages_manage_posts%2Cbusiness_management%2Cinstagram_basic%2Cinstagram_content_publish");
          },
          reject: () => { }
        });



        // this.confirmationService.confirm({

        //   message: 'Do you want to (Re) Integrate your Facebook Page(s) with Heidigi. Click on Yes to Integrate.',
        //   header: 'Integration',
        //   icon: 'pi pi-tags',
        //   acceptIcon: "none",
        //   rejectIcon: "none",
        //   rejectButtonStyleClass: "p-button-text",
        //   accept: () => {
        //     this.loading = true;

        //     // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        //     window.location.replace("https://www.facebook.com/v18.0/dialog/oauth?response_type=token&display=popup&client_id=1877295529003407&redirect_uri=https://client.heidigi.com/facebookIntegration&auth_type=rerequest&scope=pages_show_list%2Cpages_read_engagement%2Cpages_manage_posts%2Cbusiness_management%2Cinstagram_basic%2Cinstagram_content_publish");

        //   },
        //   reject: () => {
        //   }
        // });
      }
    },
    {
      label: 'Logout', icon: 'pi pi-power-off', command: () => {
        localStorage.removeItem('token');
        this.route.navigate(['login']);
      }
    }];

}
