import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }

  uploadedFiles: any[] = [];
  //Individual / Proprietor / Partnership Fir / Private Limited / Society / Others

  classes = [
    {name: 'Individual', code: 'A', factor: 1},
    {name: 'Proprietor', code: 'B', factor: 2},
    {name: 'Partnership Fir', code: 'C', factor: 3},
    {name: 'Private Limited', code: 'C', factor: 3},
    {name: 'Society', code: 'C', factor: 3},
    {name: 'Others', code: 'C', factor: 3},

];    

  ngOnInit(): void {
  }

}
