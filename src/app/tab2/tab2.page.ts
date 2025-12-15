import { Component } from '@angular/core';
import { MovieService, Movie } from '../services/movie';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  favoriteMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ionViewWillEnter() {
    this.favoriteMovies = this.movieService.getFavoriteMovies();
  }
}
