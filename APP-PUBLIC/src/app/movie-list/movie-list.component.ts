import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet';
import { PetServiceService } from "../pet-service.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers:[PetServiceService]
})
export class PetListComponent implements OnInit {

  movies: Pet[]
  public isLoading: boolean = true;
  constructor(private movieService: PetServiceService) { }

  ngOnInit(): void {
    this.movieService.getPetItems()
      .then((movies: Pet[]) => {
        // console.log("movies", movies)
        this.isLoading = false;
        this.movies = movies.map(movie => {
          return movie;
        });
      });
  }

}
