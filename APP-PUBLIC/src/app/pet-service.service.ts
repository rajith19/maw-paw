import { Injectable } from '@angular/core';
import { Pet } from './pet';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PetServiceService {

  private petsUrl = 'http://localhost:3000/api/petitems';


  constructor(private http: HttpClient, private router : Router) { }

  getPetItems(): Promise<void | Pet[]> {
    return this.http.get(this.petsUrl).toPromise()
      .then(response => response as Pet[])
      .catch(this.handleError);
  }

  getSinglePetItem(petId: string): Promise<void | Pet> {
    return this.http.get(this.petsUrl + '/' + petId)
      .toPromise()
      .then(response => response as Pet).catch(this.handleError);
  }

  createPetItem(newPet: Pet): Promise<void | Pet> {
    return this.http.post(this.petsUrl, newPet)
      .toPromise()
      .then(response => {response as Pet, this.router.navigate(['list']);})
      .catch(this.handleError);
  }

  deletePetItem(petId: string){
    return this.http.delete(this.petsUrl + '/' + petId)
    .toPromise()
    .then(result => {result as any, this.router.navigate(['list'])})
    .catch(this.handleError);
  }


  updatePetItem(newPet: Pet): Promise<void | Pet> {
    console.log("new", newPet)
    return this.http.put(this.petsUrl + '/' + newPet._id, newPet)
      .toPromise()
      .then(response => {response as Pet, this.router.navigate(['list/'+newPet._id]);})
      .catch(this.handleError);
  }


  private handleError(error: any) {
    console.log("error", error);
  }
}
