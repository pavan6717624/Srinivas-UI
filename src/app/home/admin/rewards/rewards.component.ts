import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CustomerDTO } from '../customer/customer.component';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {

  customers: CustomerDTO[] = [];
  loading: boolean = true;

  rewardAmount: number = 10000;
  perCustomer: number = 0;
  distributedTotal: number = 0;
  isDistributed: boolean = false;

  constructor(private service: ServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.loading = true;
    this.service.getCustomers().subscribe(
      (res: any) => {
        this.customers = res || [];
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Failed to load customers' });
      }
    );
  }

  distribute() {
    if (!this.customers || this.customers.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'No customers to distribute to' });
      return;
    }

    this.perCustomer = +(this.rewardAmount / this.customers.length).toFixed(2);
    this.distributedTotal = +(this.perCustomer * this.customers.length).toFixed(2);
    this.isDistributed = true;
    this.messageService.add({ severity: 'info', summary: `Each customer will receive ${this.perCustomer}` });
  }

  pay() {
    
    if (!this.isDistributed || this.perCustomer <= 0) {
      this.messageService.add({ severity: 'warn', summary: 'Please distribute before paying' });
      return;
    }

    this.confirmationService.confirm({
      message: `Pay ${this.distributedTotal} ( ${this.perCustomer} each ) to ${this.customers.length} customers?`,
      header: 'Confirm Payment',
      icon: 'pi pi-credit-card',
      accept: () => {
        this.loading = true;

        const customerMobiles = this.customers
          .map(c => c.mobile)
          .filter((mobile): mobile is string => !!mobile && mobile.trim().length > 0);

        const rewardPayload = {
          totalAmount: this.distributedTotal,
          perCustomer: this.perCustomer,
          customerMobiles: customerMobiles,
          // customerEmails: this.customers.map(c => c.emailId),
          // customers: this.customers
        };

        this.service.distributeRewards(rewardPayload).subscribe(
          (res: any) => {
            console.log(res);
            this.messageService.clear();
            this.messageService.add({ severity: 'success', summary: res.message || 'Payment completed', detail: `Distributed ${this.distributedTotal}` });
            this.getCustomers();
            this.loading = false;
            this.isDistributed = false;
          },
          (err: any) => {
            this.loading = false;
            this.messageService.clear();
            this.messageService.add({ severity: 'error', summary: 'Payment failed', detail: err.error?.message || 'An error occurred' });
          }
        );
      }
    });
  }

  onAmountChange() {
    this.isDistributed = false;
    this.perCustomer = 0;
    this.distributedTotal = 0;
  }

}
