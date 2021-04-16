import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { HttpClient, HttpResponse } from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  private moviesUrl = 'http://localhost:3000/api/movies';


  constructor(private http: HttpClient, private router : Router) { }

  getPetItem(): Promise<void | Movie[]> {
    return this.http.get(this.moviesUrl).toPromise()
      .then(response => response as Movie[])
      .catch(this.handleError);
  }

  getSinglePetItem(movieId: string): Promise<void | Movie> {
    return this.http.get(this.moviesUrl + '/' + movieId)
      .toPromise()
      .then(response => response as Movie).catch(this.handleError);
  }

  createMovie(newMovie: Movie): Promise<void | Movie> {
    return this.http.post(this.moviesUrl, newMovie)
      .toPromise()
      .then(response => {response as Movie, this.router.navigate(['list']);})
      .catch(this.handleError);
  }

  deleteMovie(movieId: string){
    return this.http.delete(this.moviesUrl + '/' + movieId)
    .toPromise()
    .then(result => {result as any, this.router.navigate(['list'])})
    .catch(this.handleError);
  }


  updateMovie(newMovie: Movie): Promise<void | Movie> {
    console.log("new", newMovie)
    return this.http.put(this.moviesUrl + '/' + newMovie._id, newMovie)
      .toPromise()
      .then(response => {response as Movie, this.router.navigate(['list/'+newMovie._id]);})
      .catch(this.handleError);
  }

  // getImages() {
  //   return this.http.get<any>('assets/showcase/data/photos.json')
  //     .toPromise()
  //     .then(res => <Image[]>res.data)
  //     .then(data => { return data; });
  //   }



  private handleError(error: any) {
    console.log("error", error);
  }
}
