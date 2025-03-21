import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiceService } from 'src/app/service.service';
export class LocationDTO {
  locationName: string = "";
  price: number = 0;
  status: boolean = false;
  message: string = '';
}
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  constructor(private service: ServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  locationName: string = "";
  price: number = 0;
  location: LocationDTO = new LocationDTO();
  locations: LocationDTO[] = [];


  ngOnInit(): void {
    this.getLocations();
  }



  deleteLocation(locationName: string) {
    this.messageService.clear();
    this.confirmationService.confirm({
      message: 'Do you want to Delete the Location',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        var formData = new FormData();
        formData.set('locationName', locationName);
        this.loading = true;
        this.service.deleteLocation(formData).subscribe(
          (res: any) => {

            this.messageService.add({ severity: 'info', summary: 'Location Deletion Success', detail: '' });

            console.log(res);
            this.loading = false;

            this.getLocations();


          },
          (err: any) => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Location Deletion Failed', detail: '' });
          }
        );


      },
      reject: () => {

      }
    });
  }


  loading = false;
  listVisible = false;
  addLocation() {


    this.loading = true;
    var locationDTO = new LocationDTO();
    locationDTO.locationName = this.locationName;
    locationDTO.price = this.price;

    this.service.addLocation(locationDTO).subscribe(
      (res: any) => {
        this.location = res;

        // console.log(res.message);

        this.messageService.clear();

        //this.listVisible=true;
        this.messageService.add({ severity: 'info', summary: res.message, detail: '' });

        console.log(res);
        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }

  getLocations() {


    this.loading = true;


    this.service.getLocations().subscribe(
      (res: any) => {
        this.locations = res;


        this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }

}


