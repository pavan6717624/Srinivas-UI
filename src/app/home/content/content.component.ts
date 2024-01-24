import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  line1: string = '';
  line2: string = '';

  line3: string = '';

  line4: string = '';

  email: string = '';
  website: string = '';
  uploadTemplateVisible = false;
  constructor(private confirmationService: ConfirmationService, public messageService: MessageService, private service: HomeService, public route: Router, private authSerivce: AuthService) {
    this.role = this.authSerivce.getRole();
  }

  role: string = '';

  tooltipItems: any[] = [];

  images: any;

  loading: boolean = false;

  inProgress() {
    alert("inProgress");
  }

  getIcon(i: number): string {
    if (this.downloading && this.imageId == i)
      return 'pi pi-spin pi-spinner';
    else
      return 'pi pi-eye';
  }

  getDisableStatus(i: number): Boolean {
    if (this.downloading && this.imageId == i)
      return true;
    else
      return false;
  }

  facebookToken = false;


  ngOnInit(): void {

    this.checkFacebookToken();

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
          this.uploadImageVisible = true
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

  getImages() {
    this.loading = true;
    this.service.getImages().subscribe(
      (res: any) => {
        this.images = res; console.log(this.images); this.loading = false;
        var image = localStorage.getItem("goto");
        console.log("image " + image);

        if(image!=null)
        {
        this.confirmationService.confirm({

          message: 'Facebook Integration is Done. Do want to Post the Last Accessed Image?',
          header: 'Post',
          icon: 'pi pi-tags',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
           
            if (image != null) {
              this.scroll(image);
              this.showTemplate(-1, image);
              localStorage.removeItem("goto");
            }
          },
          reject: () => {
            localStorage.removeItem("goto");
          }
        });
      }


      },
      (err: any) => { console.log(err); this.loading = false; }

    );
  }

  downloading: boolean = false;

  imageDownload(i: number) {
    var a = document.createElement("a"); //Create <a>
    a.href = this.templates[i]; //Image Base64 Goes here
    console.log(Math.random() + " " + Math.random());
    a.download = "HeidigiImage_" + new Date().getTime() + ".jpg"; //File name Here
    a.click(); //Downloaded file},
    a.remove(); this.downloading = false;
  }

  imageShare(i: number) {

  }



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
        // console.log(Math.random() + " " + Math.random());
        a.download = "HeidigiImage_" + new Date().getTime() + ".jpg"; //File name Here
        a.click(); //Downloaded file},
        a.remove(); this.downloading = false; this.imageId = -1;
      },
      (err: any) => { console.log(err); this.downloading = false; this.imageId = -1; }

    );
  }


  checkFacebookToken() {
    this.service.checkFacebookToken().subscribe(
      (res: any) => { this.facebookToken = res; console.log("chekcing facebook token :: " + res); },
      (err: any) => { console.log("chekcing facebook token :: " + err); }

    );
  }

  postToFacebook(image: any, i: number, event: Event) {

    if (this.facebookToken) {
      var formData = new FormData();
      formData.set("image", image);
      formData.set("template", "Template " + i);
      this.loading = true;
      //this.imageId=i;

      this.service.postToFacebookImage(formData).subscribe(
        (res: any) => { console.log(res); this.uploadTemplateVisible = false; this.messageService.add({ severity: 'info', summary: 'Posted to Facebook', detail: '' }); this.loading = false; },
        (err: any) => { console.log(err); this.loading = false; }

      );
    }
    else {
      console.log("reached here");
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'You have not Integrated your Facebook Page(s) with Heidigi. Click on Yes to Integrate.',
        header: 'Integration',
        icon: 'pi pi-tags',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.loading = true;
          localStorage.setItem("goto", image);
          // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
          window.location.replace("https://www.facebook.com/v18.0/dialog/oauth?response_type=token&display=popup&client_id=1877295529003407&redirect_uri=https://client.heidigi.com/facebookIntegration&auth_type=rerequest&scope=pages_show_list%2Cpages_read_engagement%2Cpages_manage_posts");

        },
        reject: () => {
        }
      });
      console.log("reached here too");
    }

  }
  scroll(el: string) {

    console.log(document.getElementById(el));

    document.getElementById(el)?.scrollIntoView();
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

      event.files = [];
      this.uploadedFiles = [];

    },
      (err: any) => { this.loading = false; this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: '' }); });
  }

  refresh() {
    this.ngOnInit();
  }

  templates: any[] = [];
  showSkeleton = false;

  showTemplate(i: number, publicId: string) {
    if (this.role === 'Customer') {
      this.showSkeleton = true;
      this.downloading = true;
      this.imageId = i;

      var formData = new FormData();
      formData.set("image", publicId);

      this.service.showTemplate(formData).subscribe(

        (res: any) => {
          this.showSkeleton = false;
          this.uploadTemplateVisible = true;
          this.downloading = false;
          this.templates[0] = JSON.parse(res[0]).img;
          this.templates[1] = JSON.parse(res[1]).img;
          this.templates[2] = JSON.parse(res[2]).img;

          console.log(this.templates);
        },
        (err: any) => { console.log(err) }

      );
    }
  }

}
