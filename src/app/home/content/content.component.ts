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

  imageId: number = -1;


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

  images: any;

  loading: boolean = false;

  getIcon(i: number): string
  {
   if(this.downloading && this.imageId==i) 
   return 'pi pi-spin pi-spinner';
   else
   return 'pi pi-download';
  }

  getDisableStatus(i:number): Boolean
  {
    if(this.downloading && this.imageId==i) 
    return true;
    else
    return false;
  }

  ngOnInit(): void {
    
    this.loading=true;
    this.service.getImages().subscribe(
      (res:any)=> {this.images=res; console.log(this.images);this.loading=false;},
      (err:any)=> { console.log(err); this.loading=false;}

    );
  }
 downloading: boolean=false;
  downloadImage(i: number, image:any)
  {
    var formData=new FormData();
    formData.set("image",image);
    this.downloading=true;
    this.imageId=i;
    
    this.service.downloadImage(formData).subscribe(
      (res:any)=> { var a = document.createElement("a"); //Create <a>
      console.log(res);
      a.href = res.img; //Image Base64 Goes here
     console.log(Math.random()+" "+Math.random());
      a.download = "HeidigiImage_"+new Date().getTime()+".jpg"; //File name Here
      a.click(); //Downloaded file},
      a.remove();this.downloading=false; this.imageId=-1;},
      (err:any)=> { console.log(err); this.downloading=false;this.imageId=-1;}

    );
  }
}
