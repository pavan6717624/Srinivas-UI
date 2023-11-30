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

  getVideos()
  {
    this.service.getVideos().subscribe(
      (res:any)=> {this.videos=res; console.log(this.videos);},
      (err:any)=> { console.log(err);}

    );
  }

}
