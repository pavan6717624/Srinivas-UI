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

  videos: string[] = [];
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

}
