import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/auth.service';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  items: any;

  position: string = 'top';

  imageId: number = -1;

  subcategory: string = '';
  category: string = '';

  positionOptions = [
    {
      label: 'Bottom',
      value: 'bottom'
    },
    {
      label: 'Top',
      value: 'top'
    },
    {
      label: 'Left',
      value: 'left'
    },
    {
      label: 'Right',
      value: 'right'
    }
  ];


  constructor(private messageService: MessageService, private service: HomeService, private route: Router, private authSerivce: AuthService) {
    this.role = this.authSerivce.getRole();
  }

  role: string = '';

  tooltipItems: any[] = [];

  images: any;

  loading: boolean = false;

  getIcon(i: number): string {
    if (this.downloading && this.imageId == i)
      return 'pi pi-spin pi-spinner';
    else
      return 'pi pi-download';
  }

  getDisableStatus(i: number): Boolean {
    if (this.downloading && this.imageId == i)
      return true;
    else
      return false;
  }

  ngOnInit(): void {

    this.tooltipItems = [
      {

        icon: 'pi pi-pencil',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
      },
      {

        icon: 'pi pi-refresh',
        command: () => {
         this.ngOnInit();
        }
      },
      {

        icon: 'pi pi-trash',
        command: () => {
          this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
      },
      {

        icon: 'pi pi-upload',
        command: () => {
          this.uploadImageVisible=true
        }
      },
      
    ];

    this.getImages();
    
  }

  scrollToTop() {

    (function smoothscroll() {

        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if (currentScroll > 0) {

            window.requestAnimationFrame(smoothscroll);

            window.scrollTo(0, currentScroll - (currentScroll / 8));

        }

    })();
  }

getImages()
{
  this.loading = true;
    this.service.getImages().subscribe(
      (res: any) => { this.images = res; console.log(this.images); this.loading = false; },
      (err: any) => { console.log(err); this.loading = false; }

    );
}

  downloading: boolean = false;
  downloadImage(i: number, image: any) {
    var formData = new FormData();
    formData.set("image", image.publicId);
    this.downloading = true;
    this.imageId = i;

    this.service.downloadImage(formData).subscribe(
      (res: any) => {
        var a = document.createElement("a"); //Create <a>
        console.log(res);
        a.href = res.img; //Image Base64 Goes here
        console.log(Math.random() + " " + Math.random());
        a.download = "HeidigiImage_" + new Date().getTime() + ".jpg"; //File name Here
        a.click(); //Downloaded file},
        a.remove(); this.downloading = false; this.imageId = -1;
      },
      (err: any) => { console.log(err); this.downloading = false; this.imageId = -1; }

    );
  }
  postToFacebook(image: any) {
    var formData = new FormData();
    formData.set("image", image);
    this.loading = true;
    //this.imageId=i;

    this.service.postToFacebookImage(formData).subscribe(
      (res: any) => { console.log(res); this.loading = false; },
      (err: any) => { console.log(err); this.loading = false; }

    );


  }


  uploadImageVisible = false;
  uploadedFiles: any[] = [];
  successString = "";
  uploadSuccess = false;
  onUpload(event: any) {
    // console.log({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.uploadImageVisible = false;
    this.successString = "Upload Successful";

    this.uploadSuccess = true;



  }

  uploadDone() {
    this.uploadSuccess = false;
   
  }

  handleUpload(event: any) {
    let formData = new FormData();

    if (!this.category || this.category === '' || this.category.trim().length == 0 ||
      !this.subcategory || this.subcategory === '' || this.subcategory.trim().length == 0) {
     
      this.messageService.add({ severity: 'error', summary: 'Provide Category & Sub Category', detail: '' });
      return;
    }

    for (let file of event.files) {
      formData.append('file', file, file.name);
      formData.set('category', this.category);
      formData.set('subCategory', this.subcategory);
    }
    this.loading = true;
    this.service.sendFile(formData).subscribe((result: any) => {

      if (result.result === 'success') {
        this.uploadImageVisible = false;
        this.successString = "Upload Successful";
        this.loading = false;
        this.uploadSuccess = true;
        this.getImages();
      }
      else {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: '' });
      }

      event.files=[];
      this.uploadedFiles=[];

    },
      (err: any) => { this.loading = false; this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: '' }); });
  }

  refresh()
  {
    this.ngOnInit();
  }

}
