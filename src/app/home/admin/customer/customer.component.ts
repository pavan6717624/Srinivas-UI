import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
export class CustomerDTO {

  name: string = '';
  emailId: string = '';
  mobile: string = '';
  oldMobile: string = '';
  status: boolean = false;
  message: string = '';
  wallet: number = 0;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private service: ServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  customers: CustomerDTO[] = [];
  originalCustomer: CustomerDTO[] = [];
  customerVisible = false;
  searchWord: string = '';
  editVisible = false;

  onSearch() {
    this.customers = this.originalCustomer.filter(o => 
      o.emailId.toLowerCase().indexOf(this.searchWord.toLowerCase()) != -1 
      || o.mobile.toLowerCase().indexOf(this.searchWord.toLowerCase()) != -1
      || o.name.toLowerCase().indexOf(this.searchWord.toLowerCase())!=-1
    )
  }

  refresh() {
    this.ngOnInit();
  }

  getCustomers() {
    this.loading = true;


    this.service.getCustomers().subscribe(
      (res: any) => {
        console.log(res);
        this.customers = res;
        this.originalCustomer = res;
        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }

  name: string = '';

  mobile: string = '';

  emailId: string = '';

  oldMobile: string = '';

  loading = true;

  edit(customer: CustomerDTO) {
    this.emailId = customer.emailId;
    this.mobile = customer.mobile;
    this.oldMobile = customer.mobile;
    this.name = customer.name;

    this.editVisible = true;

  }

  editCustomer() {
    var cdto = new CustomerDTO();
    cdto.emailId = this.emailId;

    cdto.mobile = this.mobile;
    cdto.name = this.name;
    cdto.oldMobile = this.oldMobile;

    this.loading = true;

    this.service.editCustomer(cdto).subscribe(
      (res: any) => {
        console.log(res);
        this.messageService.clear();

        //this.listVisible=true;
        this.messageService.add({ severity: 'info', summary: res.message, detail: '' });

        this.getCustomers();
        this.loading = false;
        this.editVisible = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }

  delete(customer: CustomerDTO) {
    this.messageService.clear();
    this.confirmationService.close();
    this.confirmationService.confirm({
      message: 'Do you want to Delete the Customer',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {

        this.loading = true;

        this.service.deleteCustomer(customer).subscribe(
          (res: any) => {
            console.log(res);
            this.messageService.clear();

            //this.listVisible=true;
            this.messageService.add({ severity: 'info', summary: res.message, detail: '' });

            this.getCustomers();
            this.loading = false;
            this.customerVisible = false;

          },
          (err: any) => {
            this.loading = false;

          }
        );


      },
      reject: () => {

      }
    });
  }

  addCustomer() {
    var cdto = new CustomerDTO();
    cdto.emailId = this.emailId;

    cdto.mobile = this.mobile;
    cdto.name = this.name;

    this.loading = true;

    this.service.addCustomer(cdto).subscribe(
      (res: any) => {
        console.log(res);
        this.messageService.clear();

        //this.listVisible=true;
        this.messageService.add({ severity: 'info', summary: res.message, detail: '' });

        this.getCustomers();
        this.loading = false;
        this.customerVisible = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );

  }

}
