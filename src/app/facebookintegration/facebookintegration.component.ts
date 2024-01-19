import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-facebookintegration',
  templateUrl: './facebookintegration.component.html',
  styleUrls: ['./facebookintegration.component.css']
})
export class FacebookintegrationComponent implements OnInit {

  accessToken: string ="";

  constructor( private service: HomeService) { 

    var url=window.location.href;
    var index1=url.indexOf("=")+1;
    var index2=url.indexOf("&");
    this.accessToken=url.substring(index1,index2);
    console.log(this.accessToken);

    var formData = new FormData();
    formData.set("accessToken", this.accessToken);

    this.service.saveFacebookToken(formData).subscribe(

      (res: any) => {
        
       if(res)
       {
         window.location.replace("https://client.heidigi.com/home/images")
       }
      },
      (err: any) => { console.log(err) }

    );

  }

  ngOnInit(): void {
   
        
  }

}
