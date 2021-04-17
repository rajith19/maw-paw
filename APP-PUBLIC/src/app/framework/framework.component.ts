import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Pet } from '../pet';
import { PetServiceService } from "../pet-service.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css'],
  providers: [MessageService, PetServiceService]

})
export class FrameworkComponent implements OnInit {


  results: any[];


  data: any[];

  constructor(private messageService: MessageService, private petitemService: PetServiceService, private router: Router) { }

  petItemId: any[];
  public pet: string = "";

  ngOnInit(): void {
    this.petitemService.getPetItems()
      .then((pets: Pet[]) => {
        this.data = pets.map(pet => {
          return pet;
        });
      });
  }

  search(event) {
    this.petitemService.getPetItems()
      .then((pets: Pet[]) => {
        this.data = pets.map(pet => {
          return pet;
        });
      });
    if (event.query == "") {
      this.results = this.data.map(e => {
        return e.name
      });
    } else {
      var searchKey = event.query.toLowerCase();
      var newData = this.data.filter(str => str.name.toLowerCase().indexOf(searchKey) > -1);
      this.results = newData.map(e => {
        return e.name
      });
    }
  }


  public searchPet(pet): void {

    this.petItemId = this.data.filter(e => e.name === pet);
    this.router.navigateByUrl('/list/' + this.petItemId[0]._id);
    this.pet = "";
  }


}
