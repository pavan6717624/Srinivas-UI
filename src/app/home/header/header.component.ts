import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private deviceService: DeviceDetectorService, private route: Router, private hService: HomeService) { }
  menuItems = [{ label: 'Hi User!' },
  { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
  {
    label: 'Edit Logo', icon: 'pi pi-image', command: () => {
      this.editLogo();
    }
  },
  { label: 'Edit Address', icon: 'pi pi-map-marker', routerLink: 'address' },
  { label: 'Contact Us', icon: 'pi pi-phone', routerLink: 'contact' },
  { label: 'Logout', icon: 'pi pi-power-off', routerLink: '/login' }];
  isMobile = false;
  ngOnInit(): void {
    this.getProfile();
  }

  address: string = '';
  mobile: string = '';
  logo: string = '';

  toHome() {
    this.route.navigate(['home']);
  }

  getProfile() {
    this.hService.getProfile().subscribe(

      (res: any) => {
        this.address = res.address;
        this.logo = res.image;
        this.mobile = res.mobile;
        this.menuItems[0].label = "Hi " + this.mobile + "!";
      },
      (err: any) => console.log(err)

    );
  }
  
  editLogoVisible=false;

  editLogo()
  {
    this.editLogoVisible=true;
  }

  uploadedFiles: any[] = [];
  
  uploadSuccess: boolean=false;



  onUpload(event: any) {
   // console.log({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });

   this.uploadedFiles= [];
   for(let file of event.files) {
    this.uploadedFiles.push(file);
}

this.uploadSuccess=true;

}

}
