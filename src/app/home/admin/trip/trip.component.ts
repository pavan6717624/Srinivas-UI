import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
export class LocationDTO {
  locationName: string = "";
  price: number=0;
}
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  constructor(private service: ServiceService) { }

  locationName: string = "";
  price: number=0;
  locations: LocationDTO[]=[];

  ngOnInit(): void {
  }

  loading=false;
 listVisible=false;
  addLocation() {


    this.loading = true;
    var locationDTO=new LocationDTO();
    locationDTO.locationName=this.locationName;
    locationDTO.price=this.price;

    this.service.addLocation(locationDTO).subscribe(
      (res: any) => {
        this.locations=res;
        this.listVisible=true;
        console.log(res);
 this.loading = false;

      },
      (err: any) => {
        this.loading = false;

      }
    );
  }

}
