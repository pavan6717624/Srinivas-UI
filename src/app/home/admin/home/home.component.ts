import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public messageService: MessageService, public confirmationService: ConfirmationService) { }

  tripVisible=false;

  locationVisible=false;

  customerVisible=false;
  ngOnInit(): void {
  }

}
