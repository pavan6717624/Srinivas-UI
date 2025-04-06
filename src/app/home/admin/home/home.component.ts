import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, public messageService: MessageService, public confirmationService: ConfirmationService) { }

  tripVisible=false;

  locationVisible=false;

  calendarVisible=false;

  customerVisible=false;
  ngOnInit(): void {
  }

  goRouter(path: string)
  {
    this.messageService.clear();
    this.confirmationService.close();
    this.router.navigate(['home/admin/'+path]);
  }

}
