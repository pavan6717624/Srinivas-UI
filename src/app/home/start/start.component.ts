import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private service: ServiceService, private route: Router, private authSerivce: AuthService) {
    this.role=this.authSerivce.getRole();
  }
  
  role: string = '';

  ngOnInit(): void {

  }


  alert(str:any)
  {
    this.route.navigate(['home/'+str]);
  }

}
