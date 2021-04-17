import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet';
import { PetServiceService } from '../pet-service.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
  providers: [PetServiceService]
})
export class DetailsPageComponent implements OnInit {

  constructor(private petitemService: PetServiceService, private route: ActivatedRoute, private router : Router) { }
  public isLoading: boolean = true;

  newPet: Pet;
  pageContent = { 
    name: "",
    image: "",
    ingredients : [],
    isOnSale: false,
    price: 0,
    description: "",
    rating: 0,
    about_item : []
  };
  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.petitemService.getSinglePetItem(params.petitemid);
    }))
      .subscribe((newPet: Pet) => {
        // console.log('SelectedPet', newPet, newPet.reviews[0].author);
        this.isLoading = false;
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

  deletePetItem(id){
    var check = this.petitemService.deletePetItem(id);
  }

  btnClick(id){
    // console.log("id", id);
    this.router.navigateByUrl('/edit/'+id);

  }

}
