import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  logo: any;
  mobile: any;
  line1: any;
  line2: any;
  line3: any;
  line4: any;
  email: any;
  website: any;
  menuItems: any;
  template: any;
  photo: any;
  back: boolean=false;

  constructor(private hService: HomeService, public router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    if(localStorage.getItem("goto")!=null)
    this.back=true;
    this.getProfile();
  }
  goBack()
  {
    this.router.navigate(['home/images']);
  }

  uploadedFiles: any[] = [];

  uploadSuccess: boolean = false;
  successString = '';
  address: string = '';

  onBeforeUpload(event:any)
  {
    this.loading=true;
  }

  onUpload(event: any) {
    this.loading=false;
   window.location.reload();
  }

  onUploadPhoto(event: any) {
    this.loading=false;
    window.location.reload();
   }
loading=false;

   editContent() {
    


    if (this.line1.trim().length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Line1 Provided.', detail: '' });
      return;
    }

    if (this.line2.trim().length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Line2 Provided.', detail: '' });
      return;
    }

    if (this.line3.trim().length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Line3 Provided.', detail: '' });
      return;
    }

    if (this.line4.trim().length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Line4 Provided.', detail: '' });
      return;
    }

    if (this.email.trim().length == 0 || this.email.trim().indexOf("@") == -1 || this.email.trim().indexOf(".") == -1) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Email Provided.', detail: '' });
      return;
    }

    if (this.address.trim().length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Address Provided.', detail: '' });
      return;
    }

    if (this.website.trim().length == 0  || this.website.trim().indexOf(".") == -1) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Website Provided.', detail: '' });
      return;
    }
    
    this.loading = true;
    var formData = new FormData();
    

    formData.set("line1", this.line1);
    formData.set("line2", this.line2);
    formData.set("line3", this.line3);
    formData.set("line4", this.line4);
    formData.set("email", this.email);
    formData.set("website", this.website);
    formData.set("address", this.address);
    this.hService.editContent(formData).subscribe(

      (res: any) => {
        this.loading = false;
        this.uploadSuccess = true;
        this.successString = "Content Edit Successful";
       
        this.line1 = res.line1;
        this.line2 = res.line2;
        this.line3 = res.line3;
        this.line4 = res.line4;
        this.email = res.email;
        this.address = res.address;
        this.website = res.website;
      },
      (err: any) => { this.loading = false; console.log(err) }

    );
  }
  getProfile() {
    this.loading=true;
    this.hService.getProfile().subscribe(

      (res: any) => {
        this.loading=false;
        this.logo = res.logo;
        this.photo=res.photo;
        this.mobile = res.mobile;
        this.line1 = res.line1;
        this.line2 = res.line2;
        this.line3 = res.line3;
        this.line4 = res.line4;
        this.email = res.email;
        this.address = res.address;
        this.website = res.website;

        this.template = res.template;
        console.log(res);
      },
      (err: any) => {console.log(err); this.loading=false}

    );
  }

}
