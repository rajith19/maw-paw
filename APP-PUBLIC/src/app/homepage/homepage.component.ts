import { Component, OnInit } from '@angular/core';
import { PetServiceService } from '../pet-service.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [PetServiceService, NgbCarouselConfig]
})
export class HomepageComponent implements OnInit {

  images1: any[];


data:any[] = ["https://res.cloudinary.com/dsu7d8dwj/image/upload/v1618523376/cat_dcv6cl.webp","https://res.cloudinary.com/dsu7d8dwj/image/upload/v1618523376/dog_uvx4zi.webp", "https://res.cloudinary.com/dsu7d8dwj/image/upload/v1618523376/dog2_yksiws.webp"
]



  constructor( config: NgbCarouselConfig) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
   }

  ngOnInit(): void {
    
    this.images1 = this.data;
    // console.log("this", this.images1)
  }

  public pageContent = {
    title: "We Have Everything Your Pet Needs."
  };


}
