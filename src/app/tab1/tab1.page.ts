import { Component } from '@angular/core';
import { MovieService, Movie } from '../services/movie';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {
    this.searchApi('Harry Potter');
  }

  searchMovie(event: any) {
    const searchTerm = event.target.value;
    this.searchApi(searchTerm);
  }

  searchApi(term: string) {
    this.movieService.getMovies(term).subscribe(result => {
      this.movies = result;
    });
  }
}
