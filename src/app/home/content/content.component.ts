import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  items: any;

  position: string = 'top';

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

  constructor(private service:HomeService) { }

  images: string[]=[];

  loading: boolean = false;

  ngOnInit(): void {

    this.loading=true;
    this.service.getImages().subscribe(
      (res:any)=> {this.images=res; console.log(this.images);this.loading=false;},
      (err:any)=> { console.log(err); this.loading=false;}

    );
  }

  downloadImage(image:any)
  {
    var formData=new FormData();
    formData.set("image",image);
    this.loading=true;
    this.service.downloadImage(formData).subscribe(
      (res:any)=> { var a = document.createElement("a"); //Create <a>
      a.href = res.img; //Image Base64 Goes here
      a.download = "coupon.jpg"; //File name Here
      a.click(); //Downloaded file},
      a.remove();this.loading=false;},
      (err:any)=> { console.log(err); this.loading=false;}

    );
  }
}
