import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieServiceService } from '../movie-service.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
  providers: [MovieServiceService]
})
export class DetailsPageComponent implements OnInit {

  constructor(private movieService: MovieServiceService, private route: ActivatedRoute, private router : Router) { }
  public isLoading: boolean = true;

  newMovie: Movie;
  pageContent = { ingredients: [], rating: 4, cardImage: "", name: "", price: 0,  upcoming: true,  reviews : [] };

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.movieService.getSinglePetItem(params.movieid);
    }))
      .subscribe((newMovie: Movie) => {
        // console.log('SelectedMovie', newMovie, newMovie.reviews[0].author);
        this.isLoading = false;
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

  deletePetItem(id){
    var check = this.movieService.deletePetItem(id);
  }

  btnClick(id){
    // console.log("id", id);
    this.router.navigateByUrl('/edit/'+id);

  }

}
