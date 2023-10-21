import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  uploadedFiles: any[] = [];
  
  uploadSuccess: boolean=false;

  address: string = '';

  onUpload(event: any) {
   // console.log({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });

   this.uploadedFiles= [];
   for(let file of event.files) {
    this.uploadedFiles.push(file);
}

this.uploadSuccess=true;

}
}
