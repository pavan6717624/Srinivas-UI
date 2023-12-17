import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  constructor(private service:HomeService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  videos: string[]= [];
loading=false;
  getVideos()
  {
    this.loading=true;
    this.service.getVideos().subscribe(
      (res:any)=> {this.videos=res; this.loading=false;console.log(this.videos);},
      (err:any)=> { console.log(err); this.loading=false;}

    );
  }

  postToFacebook(video:any)
  {
    var formData=new FormData();
    formData.set("video",video);
    //this.loading=true;
    //this.imageId=i;
    
    this.service.postToFacebookImage(formData).subscribe(
      (res:any)=> { console.log(res);},
      (err:any)=> { console.log(err); }

    );
  }

}
