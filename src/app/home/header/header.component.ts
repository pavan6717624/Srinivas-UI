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



  {
    label: 'Upload',
    icon: 'pi pi-upload',
    items: [
        {
            label: 'Logo',
            icon: 'pi pi-id-card',
            command: () => {
              this.sidebarVisible=false;
              this.editLogoVisible = true;
            }
          },
          {
            label: 'Image',
            icon: 'pi pi-image',
            command: () => {
              this.sidebarVisible=false;
              this.uploadImageVisible = true;
            }
          },
          {
            label: 'Photo',
            icon: 'pi pi-user',
            command: () => {
              this.sidebarVisible=false;
              this.uploadPhotoVisible = true;
            },
            
           
        },

        {
          label: 'Video',
          icon: 'pi pi-video',
          command: () => {
            this.sidebarVisible=false;
            this.uploadVideoVisible = true;
          },
          
         
      },
       
    ]
},
  { label: 'Images', icon: 'pi pi-images', routerLink: 'images' },
  { label: 'Videos', icon: 'pi pi-youtube', routerLink: 'videos' },
 

  {
    label: 'Edit Content', icon: 'pi pi-map-marker', command: () => {
      this.sidebarVisible=false;
      this.editContentVisible = true;
    }
  },
 
  {
    label: 'Edit Template', icon: 'pi pi-book', command: () => {
      this.sidebarVisible=false;
      this.editTemplateVisible = true;
    }
  },
  // {
  //   label: 'Upload Videos', icon: 'pi pi-youtube', command: () => {
  //     this.uploadVideoVisible = true;
  //   }
  // },
  // { label: 'Contact Us', icon: 'pi pi-phone', routerLink: 'contact' },
  { label: 'Logout', icon: 'pi pi-power-off', routerLink: '/login' }];
  isMobile = false;
  ngOnInit(): void {

    this.isMobile = this.deviceService.isMobile();
    this.getProfile();
    this.getTemplate();
    
  }

  menuClick()
  {
    
  }
  sidebarVisible: boolean=false;
  uploadVideoVisible: boolean=false;
  address: string = '';
  mobile: string = '';
  logo: string = '';
  loading: boolean = false;

  line1: string = '';
  line2: string = '';

  line3: string = '';

  line4: string = '';

  email: string = '';
  website: string = '';


  toHome() {
    this.route.navigate(['home']);
  }

  paymentOptions: any[] = [
    { name: 'T1', value: 'Template 1' },
    { name: 'T2', value: 'Template 2' },
    { name: 'T3', value: 'Template 3' }
];

templateChange()
{
  this.templateImage='';
  this.getTemplate();
}
changeTemplate()
{
  this.loading=true;
  var formData = new FormData();

  
  formData.set("template",this.template);
  this.hService.changeTemplate(formData).subscribe(

    (res: any) => {
      this.loading=false;
      this.uploadSuccess = true;
      this.successString = "Template change Successful";
      this.editTemplateVisible=false;
      
    },
    (err: any) =>{this.loading=false; console.log(err)}

  );
}

  getProfile() {
    this.hService.getProfile().subscribe(

      (res: any) => {
        this.address = res.address;
        this.logo = res.image;
        this.mobile = res.mobile;
        this.line1=res.line1;
        this.line2=res.line2;
        this.line3=res.line3;
        this.line4=res.line4;
        this.email=res.email;
        this.address=res.address;
        this.website=res.website;
        this.menuItems[0].label = "Hi " + this.mobile + "!";
        this.template=res.template;
        console.log(res);
      },
      (err: any) => console.log(err)

    );
  }
templateImage: string = '';
template: string = '';
  getTemplate() {
    var formData=new FormData();
    formData.set("template",this.template);
    this.hService.getTemplate(formData).subscribe(

      (res: any) => {
        
        this.templateImage=res.img;
       
      },
      (err: any) => console.log(err)

    );
  }


  editLogoVisible = false;
  
  uploadImageVisible = false;
  uploadPhotoVisible = false;


  uploadedFiles: any[] = [];

  uploadSuccess: boolean = false;

  editContentVisible: boolean = false;
  editTemplateVisible: boolean =false;
  successString="";

  // editAddress()
  // {
  //   this.loading=true;
  //   var formData = new FormData();

  //   formData.set("address",this.address);
  //   this.hService.editAddress(formData).subscribe(

  //     (res: any) => {
  //       this.loading=false;
  //       this.address = res.address;
  //       this.uploadSuccess = true;
  //       this.successString = "Address Edit Successful";
  //       this.editContentVisible=false;
  //     },
  //     (err: any) =>{this.loading=false; console.log(err)}

  //   );
  // }

  editContent()
  {
  this.loading=true;
    var formData = new FormData();

    formData.set("line1",this.line1);
    formData.set("line2",this.line2);
    formData.set("line3",this.line3);
    formData.set("line4",this.line4);
    formData.set("email",this.email);
    formData.set("website",this.website);
    formData.set("address",this.address);
    this.hService.editContent(formData).subscribe(

      (res: any) => {
        this.loading=false;
        this.uploadSuccess = true;
        this.successString = "Content Edit Successful";
        this.editContentVisible=false;
        this.line1=res.line1;
        this.line2=res.line2;
        this.line3=res.line3;
        this.line4=res.line4;
        this.email=res.email;
        this.address=res.address;
        this.website=res.website;
      },
      (err: any) =>{this.loading=false; console.log(err)}

    );
  }

  window: any = window;

  onUpload(event: any) {
    // console.log({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.successString = "Upload Successful"

    this.uploadSuccess = true;
    this.getProfile();
    this.editLogoVisible = false;
    this.uploadImageVisible=false;
    this.uploadPhotoVisible=false;
    

  }

}
