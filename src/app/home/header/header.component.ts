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
      this.editLogoVisible = true;
    }
  },
  {
    label: 'Edit Address', icon: 'pi pi-map-marker', command: () => {
      this.editAddressVisible = true;
    }
  },
  { label: 'Contact Us', icon: 'pi pi-phone', routerLink: 'contact' },
  { label: 'Logout', icon: 'pi pi-power-off', routerLink: '/login' }];
  isMobile = false;
  ngOnInit(): void {
    this.getProfile();
  }

  address: string = '';
  mobile: string = '';
  logo: string = '';
  loading: boolean = false;

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



  editLogoVisible = false;



  uploadedFiles: any[] = [];

  uploadSuccess: boolean = false;

  editAddressVisible: boolean = false;

  successString="";

  editAddress()
  {
    this.loading=true;
    var formData = new FormData();

    formData.set("address",this.address);
    this.hService.editAddress(formData).subscribe(

      (res: any) => {
        this.loading=false;
        this.address = res.address;
        this.uploadSuccess = true;
        this.successString = "Address Edit Successful";
        this.editAddressVisible=false;
      },
      (err: any) =>{this.loading=false; console.log(err)}

    );
  }

  onUpload(event: any) {
    // console.log({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.successString = "Logo Upload Successful"

    this.uploadSuccess = true;
    this.getProfile();
    this.editLogoVisible = false;

  }

}
