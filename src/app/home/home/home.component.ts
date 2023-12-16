import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatus } from 'src/app/login/login.component';
import { ServiceService } from 'src/app/service.service';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor() {
    
  }
  
  heightd: number = window.innerHeight - 90;

  

  ngOnInit(): void {

  }

}
