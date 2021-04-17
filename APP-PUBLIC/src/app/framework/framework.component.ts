import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Pet } from '../pet';
import { PetServiceService } from "../pet-service.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css'],
  providers: [MessageService, PetServiceService]

})
export class FrameworkComponent implements OnInit {


  results: string[];

  eventsQuery: string;

  data: any[]
  // = [
  //   { label: 'Berlin', value: 'Berlin' },
  //   { label: 'Frankfurt', value: 'Frankfurt' },
  //   { label: 'Hamburg', value: 'Hamburg' },
  //   { label: 'Munich', value: 'Munich' }
  // ]
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig, private movieService: PetServiceService, private router : Router) { }

  petItemId: any[];
  public pet: string = "";

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.movieService.getPetItems()
      .then((pets: Pet[]) => {
        console.log("movies", pets)
        this.data = pets.map(pet => {
          return pet;
        });
      });
  }

  search(event) {
    console.log(event.query);
    this.eventsQuery = event.query
    this.results = this.data.map(e => {
      return e.name
    });
    

  }


  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Under Maintenance' });
  }


  public searchPet(pet): void {

    this.petItemId = this.data.filter(e =>e.name === pet);
    console.log("this.petItemId", this.petItemId[0]._id);
    console.log("pet", pet);
    this.router.navigateByUrl('/list/'+this.petItemId[0]._id);
    this.pet = "";
  }


}
