import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  constructor(private messageService: MessageService, private service: HomeService) { }

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

  downloadVideo(video: string) {
    this.loading = true;
    var formData = new FormData();
    formData.set("video", video);
    this.service.downloadVideo(formData).subscribe(
      (res: any) => {

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([res], { type: 'mp4' }));
        link.download = 'demo.mp4';
        link.click();
        link.remove();


        this.loading = false;
      },
      (err: any) => { console.log(err); this.loading = false; }

    );
  }

  postToFacebook(video: any) {
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

}
