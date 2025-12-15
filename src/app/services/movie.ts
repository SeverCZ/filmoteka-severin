import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

export interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '8aa1bfe';
  private url = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) { }


  getMovies(searchTerm: string): Observable<Movie[]> {
    if (!searchTerm) return of([]);

    return this.http.get<any>(`${this.url}?apikey=${this.apiKey}&s=${searchTerm}`)
      .pipe(
        map(result => {
          if (result.Response === 'False') return [];

          return result.Search.map((item: any) => ({
            id: item.imdbID,
            title: item.Title,
            year: item.Year,
            poster: item.Poster !== 'N/A' ? item.Poster : 'https://placehold.co/100x150?text=No+Image',
            description: ''
          }));
        })
      );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<any>(`${this.url}?apikey=${this.apiKey}&i=${id}&plot=full`)
      .pipe(
        map(item => ({
          id: item.imdbID,
          title: item.Title,
          year: item.Year,
          poster: item.Poster !== 'N/A' ? item.Poster : 'https://placehold.co/300x450?text=No+Image',
          description: item.Plot
        }))
      );
  }


  getFavoriteMovies(): Movie[] {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }

  isFavorite(id: string): boolean {
    const favorites = this.getFavoriteMovies();
    return favorites.some(m => m.id === id);
  }

  toggleFavorite(movie: Movie) {
    let favorites = this.getFavoriteMovies();

    if (this.isFavorite(movie.id)) {
      favorites = favorites.filter(m => m.id !== movie.id);
    } else {
      favorites.push(movie);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
