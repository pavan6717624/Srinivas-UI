import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropDown } from 'src/app/login/login.component';
import { ServiceService } from 'src/app/service.service';
import { AuthService } from 'src/app/shared/auth.service';
import { HomeService } from '../home.service';
export class SendToFacebook {
  image: string = '';
  template: string = '';
  pages: string[] = [];
}
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  items: any;

  position: string = 'top';

  imageId: number = -1;

  subcategory: DropDown = new DropDown();
  category: DropDown = new DropDown();

  line1: string = '';
  line2: string = '';

  line3: string = '';

  line4: string = '';

  email: string = '';
  website: string = '';

  facebookPages: string[] = [];

  instagramPages: string[] = [];

  uploadTemplateVisible = false;
  constructor(private sservice: ServiceService, private confirmationService: ConfirmationService, private messageService: MessageService, private service: HomeService, public route: Router, private authSerivce: AuthService) {
    this.role = this.authSerivce.getRole();
  }
  

  role: string = '';



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

  filterVisible=false;

  ngOnInit(): void {

    if (this.role === 'Customer') {
      this.checkFacebookToken();

      this.checkProfile();
    }
    this.getImages();

    this.getCategories();

    this.getSubCategories();



  }

  ssubcategories: DropDown[]=[];

  filter()
  {
    console.log(this.ssubcategories)
  // this.images=this.imagesBackup.filter((o:any)=>(this.ssubcategories== null || this.fsubcategory.name== null || this.fsubcategory.name.trim().length== 0 || o.subCategory==this.fsubcategory.name));
  }

  cat: string = '';
  tags: string = '';
  getCategory() {
    this.loading = true;
    console.log("in category");
    this.sservice.getCategory().subscribe(
      (res: any) => {
        this.cat = res.name;
        if (this.role === 'Customer')
          this.category = this.categories.filter(o => o.name = this.cat)[0];
        this.getSubCategories();
        //console.log("categotry:: "+this.category.name);
        this.loading = false;
      },
      (err: any) => {
        console.log("categotry e:: " + err);
        this.category = new DropDown();
        this.loading = false;

      }
    );
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

  profileCheck = false;
  checkProfile() {

    this.service.checkProfile().subscribe(

      (res: any) => {
        this.profileCheck = res;
        console.log(res);
        if (!res) {
          this.confirmationService.confirm({
            rejectVisible: false,
            message: 'Please Complete Your Profile.',
            header: 'Profile',
            icon: 'pi pi-user',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {

              this.route.navigate(['home/profile']);

            },
            reject: () => {
              this.route.navigate(['home/profile']);
            }
          });
        }
        console.log(res);

      },
      (err: any) => { console.log(err); }

    );
  }


  imagesBackup:any;

  getImages() {
    this.showSkeleton = true;
    this.skeletonHeader = "Getting Images....";
    this.service.getImages().subscribe(
      (res: any) => {
        this.images = res;
        this.imagesBackup=res;
         console.log(this.images); this.showSkeleton = false;
        this.skeletonHeader = "";
        var image = localStorage.getItem("goto");
        console.log("image " + image);

        if (image != null) {
          this.confirmationService.confirm({

            message: 'Do want to Post the Last Accessed Image?',
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
      (err: any) => {
        console.log(err); this.showSkeleton = false;
        this.skeletonHeader = "";
      }

    );
  }

  downloading: boolean = false;
  skeletonHeader: string = '';
  downloadImage(i: number) {
    var formData = new FormData();
    formData.set("template", "Template " + i)
    formData.set("image", this.templates[0]);
    // this.downloading = true;
    this.showSkeleton = true;
    this.skeletonHeader = "Downloading....";
    this.service.downloadImage(formData).subscribe(
      (res: any) => {
        var a = document.createElement("a"); //Create <a>
        console.log(res);
        a.href = res.img; //Image Base64 Goes here
        // console.log(Math.random() + " " + Math.random());
        a.download = "HeidigiImage_" + new Date().getTime() + ".jpg"; //File name Here
        a.click(); //Downloaded file},
        a.remove();
        this.showSkeleton = false;
        this.skeletonHeader = "";
        this.downloading = false;
      },
      (err: any) => {
        console.log(err); this.skeletonHeader = ""; this.showSkeleton = false;
        //this.downloading = false; 
      }

    );
  }

  categories: DropDown[] = [];
  subcategories: DropDown[] = [];
  getCategories() {
    this.sservice.getCategories().subscribe(
      (res: any) => {
        this.categories = res;
        console.log(this.categories);
        this.getCategory();
      },
      (err: any) => {
        this.categories = [];

      }
    );
  }

  getSubCategories() {
    if (!(this.category == null || this.category.name == null || this.category.name.trim().length == 0)) {
      this.loading = true;
      var formData = new FormData();
      formData.set("category", this.category.name)
      this.sservice.getSubCategories(formData).subscribe(
        (res: any) => {
          this.subcategories = res;
          console.log(this.subcategories);
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
          this.subcategories = [];

        }
      );
    }
    else
      this.subcategories = [];
  }

  checkFacebookToken() {
    this.service.checkFacebookToken().subscribe(
      (res: any) => {
        this.facebookToken = res;
        if (this.facebookToken)
          {
            this.getFacebookPageNames();
            this.getInstagramPageNames();
          }
        console.log("chekcing facebook token :: " + res);
      },
      (err: any) => { console.log("chekcing facebook token :: " + err); }

    );
  }

  getFacebookPageNames() {
    this.service.getFacebookPageNames().subscribe(
      (res: any) => { this.facebookPages = res; console.log("chekcing facebook pages :: " + res); },
      (err: any) => { console.log("chekcing facebook pages :: " + err); }

    );
  }

  getInstagramPageNames()
  {
    this.service.getInstagramPageNames().subscribe(
      (res: any) => {this.instagramPages = res; console.log("chekcing instagram pages :: " + res); },
      (err: any) => { console.log("chekcing instagram pages :: " + err); }

    );
  }

  showPages = false;

  selectedPages: string[] = [];

  selectedTemplate: string = '';

  selectPages(i: number, event: Event) {


    if (this.profileCheck) {
      if (this.facebookToken) {
        this.selectedPages = [];
        this.showPages = true;
        this.selectedTemplate = 'Template ' + i;
      }
      else {
        console.log("reached here");
        // this.confirmationService.confirm({
        //   target: event.target as EventTarget,
        //   message: 'You have not Integrated your Facebook Page(s) with Heidigi. Click on Yes to Integrate.',
        //   header: 'Integration',
        //   icon: 'pi pi-tags',
        //   acceptIcon: "none",
        //   rejectIcon: "none",
        //   rejectButtonStyleClass: "p-button-text",
        //   accept: () => {
        //     this.loading = true;
        //     localStorage.setItem("goto", this.templates[0]);
        //     // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        //     window.location.replace("https://www.facebook.com/v18.0/dialog/oauth?response_type=token&display=popup&client_id=1877295529003407&redirect_uri=https://client.heidigi.com/facebookIntegration&auth_type=rerequest&scope=pages_show_list%2Cpages_read_engagement%2Cpages_manage_posts");

        //   },
        //   reject: () => {
        //   }
        // });
        this.confirmationService.confirm({
          message: 'You have not Integrated your Facebook Page(s) with Heidigi. Click on Yes to Integrate.',
          header: 'Integration',
          rejectVisible: true,
          icon: 'pi pi-tags',
          accept: () => {
            this.loading = true;
            window.location.replace("https://www.facebook.com/v18.0/dialog/oauth?response_type=token&display=popup&client_id=1877295529003407&redirect_uri=https://client.heidigi.com/facebookIntegration&auth_type=rerequest&scope=pages_show_list%2Cpages_read_engagement%2Cpages_manage_posts");
          },
          reject: () => {}
        });

        console.log("reached here too");
      }
    }
    else {
      this.confirmationService.confirm({
        rejectVisible: false,
        message: 'Please Complete Your Profile.',
        header: 'Profile',
        icon: 'pi pi-user',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {

          this.route.navigate(['home/profile']);

        },
        reject: () => {
          this.route.navigate(['home/profile']);
        }
      });
    }
  }
  showInstagramPages=false;
  selectInstagramPages(i: number, event: Event) {


    if (this.profileCheck) {
      if (this.facebookToken) {
        this.selectedPages = [];
        this.showInstagramPages = true;
        this.selectedTemplate = 'Template ' + i;
      }
      else {
        console.log("reached here");
        // this.confirmationService.confirm({
        //   target: event.target as EventTarget,
        //   message: 'You have not Integrated your Facebook Page(s) with Heidigi. Click on Yes to Integrate.',
        //   header: 'Integration',
        //   icon: 'pi pi-tags',
        //   acceptIcon: "none",
        //   rejectIcon: "none",
        //   rejectButtonStyleClass: "p-button-text",
        //   accept: () => {
        //     this.loading = true;
        //     localStorage.setItem("goto", this.templates[0]);
        //     // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        //     window.location.replace("https://www.facebook.com/v18.0/dialog/oauth?response_type=token&display=popup&client_id=1877295529003407&redirect_uri=https://client.heidigi.com/facebookIntegration&auth_type=rerequest&scope=pages_show_list%2Cpages_read_engagement%2Cpages_manage_posts");

        //   },
        //   reject: () => {
        //   }
        // });

        this.confirmationService.confirm({
          message: 'You have not Integrated your Facebook Page(s) with Heidigi. Click on Yes to Integrate.',
          header: 'Integration',
          rejectVisible: true,
          icon: 'pi pi-tags',
          accept: () => {
            this.loading = true;
            window.location.replace("https://www.facebook.com/v18.0/dialog/oauth?response_type=token&display=popup&client_id=1877295529003407&redirect_uri=https://client.heidigi.com/facebookIntegration&auth_type=rerequest&scope=pages_show_list%2Cpages_read_engagement%2Cpages_manage_posts");
          },
          reject: () => {}
        });

        console.log("reached here too");
      }
    }
    else {
      this.confirmationService.confirm({
        rejectVisible: false,
        message: 'Please Complete Your Profile.',
        header: 'Profile',
        icon: 'pi pi-user',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {

          this.route.navigate(['home/profile']);

        },
        reject: () => {
          this.route.navigate(['home/profile']);
        }
      });
    }
  }


  maxView(id: number) {
    var w = window.open("", "_blank");
    w?.document.write("<img src='" + this.templates[id] + "'/>");

  }

  toProfile() {
    localStorage.setItem("goto", this.templates[0]);
    this.route.navigate(['home/profile'])
  }

  //headerValue="Loading Images...";
  postToFacebook() {



    var send = new SendToFacebook();
    send.image = this.templates[0];
    send.template = this.selectedTemplate;
    send.pages = this.selectedPages;

    this.skeletonHeader="Posting to Facebook...";
    // alert(this.headerValue);
    this.loading = true;
    //this.imageId=i;

    this.service.postToFacebookImage(send).subscribe(
      (res: any) => { this.skeletonHeader="Loading Images...";console.log(res); this.uploadTemplateVisible = false; this.showPages = false; this.selectedPages = []; this.messageService.add({ severity: 'info', summary: 'Posted to Facebook', detail: '' }); this.loading = false; },
      (err: any) => { this.skeletonHeader="Loading Images...";console.log(err); this.loading = false; }

    );



  }

  postToInstagram()
  {
    var send = new SendToFacebook();
    send.image = this.templates[0];
    send.template = this.selectedTemplate;
    send.pages = this.selectedPages;

    this.skeletonHeader="Posting to Instagram...";
    // alert(this.headerValue);
    this.loading = true;
    //this.imageId=i;

   

    this.service.postToInstagramImage(send).subscribe(
      (res: any) => {this.skeletonHeader="Loading Images...";  console.log(res); this.uploadTemplateVisible = false; this.showPages = false; this.selectedPages = []; this.messageService.add({ severity: 'info', summary: 'Posted to Instagram', detail: '' }); this.loading = false; },
      (err: any) => {this.skeletonHeader="Loading Images..."; console.log(err); this.loading = false; }

    );
  }
  scroll(el: string) {



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

  toUpload() {
    this.messageService.clear();
    this.uploadImageVisible = true;
    if (this.role == 'Designer')
      this.category = new DropDown();
    this.subcategory == new DropDown();
    this.uploadedFiles = [];
  }

  checkUpload() {
    return false;
  }

  handleUpload(event: any) {
    let formData = new FormData();

    if (this.category == null || this.category.name == null || this.category.name.trim().length == 0 ||
      this.subcategory == null || this.subcategory.name == null || this.subcategory.name.trim().length == 0) {

      this.messageService.add({ severity: 'error', summary: 'Provide Category & Sub Category', detail: '' });
      return;
    }

    for (let file of event.files) {
      formData.append('file', file, file.name);
      formData.set('category', this.category.name);
      formData.set('subCategory', this.subcategory.name);
      formData.set('tags', this.tags);
    }

    this.showSkeleton = true;
    this.skeletonHeader = "Uploading....";
    this.service.sendFile(formData).subscribe((result: any) => {

      if (result.result === 'success') {

        this.uploadImageVisible = false;
        this.successString = "Upload Successful";

        this.showSkeleton = false;
        this.skeletonHeader = "";
        this.uploadSuccess = true;
        this.getImages();
      }
      else {

        this.showSkeleton = false;
        this.skeletonHeader = "";
        this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: '' });
      }

      event.files = [];
      this.uploadedFiles = [];

    },
      (err: any) => {
        this.showSkeleton = false;
        this.skeletonHeader = ""; this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: '' });
      });
  }

  refresh() {
    this.ngOnInit();
  }

  templates: any[] = [];
  showSkeleton = false;

  showTemplate(i: number, publicId: string) {
    if (this.role === 'Customer') {
      this.showSkeleton = true;
      this.skeletonHeader = "Getting Templates....";
      //this.downloading = true;
      this.imageId = i;
      this.templates[0] = "";
      this.templates[1] = "assets/images/loading.gif";
      this.templates[2] = "assets/images/loading.gif";
      var formData = new FormData();
      formData.set("image", publicId);

      this.service.showTemplate(formData).subscribe(

        (res: any) => {
          console.log(res);
          this.skeletonHeader = "";
          this.showSkeleton = false;
          this.uploadTemplateVisible = true;
          this.downloading = false;
          this.templates[0] = JSON.parse(res[0]).img;
          this.templates[1] = JSON.parse(res[1]).img;
          this.templates[2] = JSON.parse(res[2]).img;

          console.log(this.templates);
        },
        (err: any) => {
          this.skeletonHeader = "";
          this.showSkeleton = false; console.log(err)
        }

      );
    }
  }

}
