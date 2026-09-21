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
  allocationMode: 'pool' | 'individual' = 'pool';
  individualAmount: number = 500;
  selectedCustomer: CustomerDTO | null = null;

  constructor(private service: ServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.loading = true;
    const selectedMobile = this.selectedCustomer?.mobile;
    this.service.getCustomers().subscribe(
      (res: any) => {
        this.customers = res || [];
        if (selectedMobile) {
          this.selectedCustomer = this.customers.find(customer => customer.mobile === selectedMobile) || null;
        }
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

  selectCustomer(customer: CustomerDTO) {
    this.selectedCustomer = customer;
  }

  allocateIndividual() {
    if (!this.selectedCustomer || !this.individualAmount || this.individualAmount <= 0) {
      this.messageService.add({ severity: 'warn', summary: 'Select a customer and enter a valid reward amount' });
      return;
    }

    const customerMobile = this.selectedCustomer.mobile;
    if (!customerMobile || !customerMobile.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'This customer does not have a mobile number' });
      return;
    }

    this.confirmationService.confirm({
      message: `Allocate ${this.individualAmount} to ${this.selectedCustomer.name}?`,
      header: 'Confirm Individual Allocation',
      icon: 'pi pi-send',
      accept: () => {
        this.loading = true;
        const rewardPayload = {
          totalAmount: +this.individualAmount.toFixed(2),
          perCustomer: +this.individualAmount.toFixed(2),
          customerMobiles: [customerMobile]
        };

        this.service.distributeRewards(rewardPayload).subscribe(
          (res: any) => {
            this.messageService.add({ severity: 'success', summary: res.message || 'Reward allocated', detail: `${this.individualAmount} sent to ${this.selectedCustomer?.name}` });
            this.loading = false;
            this.getCustomers();
          },
          (err: any) => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Allocation failed', detail: err.error?.message || 'An error occurred' });
          }
        );
      }
    });
  }

  redeemIndividual() {
    if (!this.selectedCustomer || !this.individualAmount || this.individualAmount <= 0) {
      this.messageService.add({ severity: 'warn', summary: 'Select a customer and enter a valid redemption amount' });
      return;
    }

    if (this.individualAmount > (this.selectedCustomer.amount || 0)) {
      this.messageService.add({ severity: 'warn', summary: 'Redemption exceeds the available wallet balance' });
      return;
    }

    const customerMobile = this.selectedCustomer.mobile;
    if (!customerMobile || !customerMobile.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'This customer does not have a mobile number' });
      return;
    }

    this.confirmationService.confirm({
      message: `Redeem ${this.individualAmount} from ${this.selectedCustomer.name}?`,
      header: 'Confirm Reward Redemption',
      icon: 'pi pi-wallet',
      accept: () => {
        this.loading = true;
        const redemptionAmount = +this.individualAmount.toFixed(2);
        const rewardPayload = {
          totalAmount: -redemptionAmount,
          perCustomer: -redemptionAmount,
          customerMobiles: [customerMobile]
        };

        this.service.distributeRewards(rewardPayload).subscribe(
          (res: any) => {
            this.messageService.add({ severity: 'success', summary: res.message || 'Reward redeemed', detail: `${redemptionAmount} redeemed from ${this.selectedCustomer?.name}` });
            this.loading = false;
            this.getCustomers();
          },
          (err: any) => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Redemption failed', detail: err.error?.message || 'An error occurred' });
          }
        );
      }
    });
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
