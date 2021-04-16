import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieServiceService } from "../movie-service.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers:[MovieServiceService]
})
export class MovieListComponent implements OnInit {

  movies: Movie[]
  public isLoading: boolean = true;
  constructor(private movieService: MovieServiceService) { }

  ngOnInit(): void {
    this.movieService.getMovies()
      .then((movies: Movie[]) => {
        // console.log("movies", movies)
        this.isLoading = false;
        this.movies = movies.map(movie => {
          return movie;
        });
      });
  }

}
