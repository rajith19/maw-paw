import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet';
import { PetServiceService } from '../pet-service.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [PetServiceService]

})
export class CreateComponent implements OnInit {
  public href: string = "";
  public newPet: Pet = {
    _id: "",
    name: "",
    image: "",
    ingredients : [],
    isOnSale: false,
    price: 0,
    description: "",
    rating: 5,
    about_item: [],
  }
  constructor(private petService: PetServiceService, private route: ActivatedRoute, private router: Router) { }

  pageContent = { 
    name: "",
    image: "",
    ingredients : [],
    isOnSale: false,
    price: 0,
    description: "",
    rating: 5,
    about_item: []
  };

  ngOnInit(): void {
    this.href = this.router.url;
    // console.log(this.router.url);
    if(this.href != "/new"){
      this.route.params.pipe(switchMap((params: Params) => {
        return this.petService.getSinglePetItem(params.petitemid);
      }))
        .subscribe((newPet: Pet) => {
          this.newPet = newPet;
          this.pageContent.name = newPet.name;
          this.pageContent.image = newPet.image;
          this.pageContent.ingredients = newPet.ingredients;
          this.pageContent.isOnSale = newPet.isOnSale;
          this.pageContent.price = newPet.price;
          this.pageContent.description = newPet.description;
          this.pageContent.rating = newPet.rating;
          this.pageContent.about_item = newPet.about_item;
        });
    }
    
  }

  public createEditNewPet(newPet: Pet): void {
    // console.log("newPet",newPet, this.href);
    if (this.href != "/new") {
      this.petService.updatePetItem(newPet);
    } else {
     this.petService.createPetItem(newPet);
      //  console.log("res", newPet);
    }
  }

}
