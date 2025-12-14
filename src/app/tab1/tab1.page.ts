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
    this.movies = this.movieService.getMovies();
  }

  searchMovie(event: any) {
    const searchTerm = event.target.value;
    this.movies = this.movieService.getMovies(searchTerm);
  }
}
