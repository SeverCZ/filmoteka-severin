import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../../services/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: false,
})
export class MovieDetailsPage implements OnInit {
  movie: Movie | undefined;
  isFav = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(id).subscribe(result => {
        this.movie = result;
        this.isFav = this.movieService.isFavorite(this.movie.id);
      });
    }
  }

  toggleHeart() {
    if (this.movie) {
      this.movieService.toggleFavorite(this.movie);
      this.isFav = !this.isFav;
    }
  }
}
