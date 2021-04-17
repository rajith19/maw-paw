import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieServiceService } from '../movie-service.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [MovieServiceService]

})
export class CreateComponent implements OnInit {
  public href: string = "";
  public newMovie: Movie = {
    _id: "",
    name: "",
    cardImage: "",
    ingredients: [],
    upcoming: true,
    price: 0,
    rating: 5,
    reviews: [{
      author: "",
      rating: 5,
      reviewText: "",
    }]
  }
  constructor(private movieService: MovieServiceService, private route: ActivatedRoute, private router: Router) { }

  pageContent = { ingredients: [],rating:4, cardImage: "", name: "", price: 0, upcoming: false, reviews: [] };

  ngOnInit(): void {
    this.href = this.router.url;
    // console.log(this.router.url);
    if(this.href != "/new"){
      this.route.params.pipe(switchMap((params: Params) => {
        return this.movieService.getSinglePetItem(params.movieid);
      }))
        .subscribe((newMovie: Movie) => {
          this.newMovie = newMovie;
          this.pageContent.ingredients = newMovie.ingredients;
          this.pageContent.cardImage = newMovie.cardImage;
          this.pageContent.name = newMovie.name;
          this.pageContent.price = newMovie.price;
          this.pageContent.upcoming = newMovie.upcoming;
          this.pageContent.reviews = newMovie.reviews;
          this.pageContent.rating = newMovie.rating;
        });
    }
    
  }

  public createEditNewMovie(newMovie: Movie): void {
    // console.log("newMovie",newMovie, this.href);
    if (this.href != "/new") {
      this.movieService.updatePetItem(newMovie);
    } else {
     this.movieService.createPetItem(newMovie);
      //  console.log("res", newMovie);
    }
  }

}
