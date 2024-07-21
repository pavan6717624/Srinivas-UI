import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeIndex: number = 1;

  items: MenuItem[] =  [{
    label: 'Customer',
    routerLink: 'customer'
},
{
    label: 'Service',
    routerLink: 'seat'
},
{
    label: 'Record',
    routerLink: 'payment'
},
{
    label: 'Confirmation',
    routerLink: 'confirmation'
}
];


  ngOnInit() {
     
  }

  constructor() { }


}
