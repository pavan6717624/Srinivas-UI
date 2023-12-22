import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  constructor(private messageService: MessageService, private service: HomeService,public route:Router) { }

  ngOnInit(): void {
    this.getVideos();
  }

  videos: any;
  loading = false;
  getVideos() {
    this.loading = true;
    this.service.getVideos().subscribe(
      (res: any) => { this.videos = res; this.loading = false; console.log(this.videos); },
      (err: any) => { console.log(err); this.loading = false; }

    );
  }

  imageDownload(i: number)
  {
    var a = document.createElement("a"); //Create <a>
      a.href = this.templates[i]; //Image Base64 Goes here
    console.log(Math.random() + " " + Math.random());
    a.download = "HeidigiImage_" + new Date().getTime() + ".jpg"; //File name Here
    a.click(); //Downloaded file},
    a.remove(); this.downloading = false;
  }
checking:any;
  downloadVideo(video: string) {
    this.loading = true;
    var formData = new FormData();
    formData.set("video", video);
    this.service.downloadVideo(formData).subscribe(
      (res: any) => {

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([res], { type: 'mp4' }));
        this.checking=link.href;
        console.log(this.checking);
        link.download = 'demo.mp4';
        link.click();
        link.remove();
        this.loading = false;
      },
      (err: any) => { console.log(err); this.loading = false; }

    );
  }

  postToFacebook(video: any,i:number) {
    this.loading = true;
    var formData = new FormData();
    formData.set("video", video);
    //this.loading=true;
    //this.imageId=i;

    this.service.postToFacebookVideo(formData).subscribe(
      (res: any) => { console.log(res); this.messageService.add({ severity: 'info', summary: 'Posted to Facebook', detail: '' }); this.loading = false; },
      (err: any) => { console.log(err); this.loading = false; }

    );
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
    this.service.sendVideo(formData).subscribe((result: any) => {

      if (result.result === 'success') {
        this.uploadVideoVisible = false;
        this.successString = "Upload Successful";
        this.loading = false;
        this.uploadSuccess = true;
        this.getVideos();
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

  subcategory: string = '';
  category: string = '';

  inProgress()

{
  alert("inProgress");
}

uploadVideoVisible = false;
  uploadedFiles: any[] = [];
  successString = "";
  uploadSuccess = false;
  uploadTemplateVisible=false;


  templates:any[]=[];

  downloading=false;

  videoId = -1;

  showTemplate(i:number,publicId: string)
  {
    this.downloading = true;
    this.videoId = i;
  
    var formData=new FormData();
    formData.set("video",publicId);
   
    this.service.showTemplateVideo(formData).subscribe(
  
      (res: any) => {
        this.uploadTemplateVisible=true;
        this.downloading = false;
       this.templates[0]=JSON.parse(res[0]).img;
       this.templates[1]=JSON.parse(res[1]).img;
       this.templates[2]=JSON.parse(res[2]).img;

       console.log(this.templates);
      },
      (err: any) => {  console.log(err) }
  
    );
  }

}
