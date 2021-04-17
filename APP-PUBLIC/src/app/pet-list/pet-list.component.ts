import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet';
import { PetServiceService } from "../pet-service.service";
@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
  providers: [PetServiceService]
})
export class PetListComponent implements OnInit {

  pets: Pet[]
  public isLoading: boolean = true;
  constructor(private petitemService: PetServiceService) { }

  ngOnInit(): void {
    this.petitemService.getPetItems()
      .then((pets: Pet[]) => {
        // console.log("pets", pets)
        this.isLoading = false;
        this.pets = pets.map(pet => {
          return pet;
        });
      });
  }
}

