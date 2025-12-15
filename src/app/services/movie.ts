import { Injectable } from '@angular/core';

export interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [
    { id: '1', title: 'Matrix', year: '1999', poster: 'https://placehold.co/100x150/000000/FFF?text=Matrix', description: 'Neo hledá pravdu.' },
    { id: '2', title: 'Inception', year: '2010', poster: 'https://placehold.co/100x150/000000/FFF?text=Inception', description: 'Sen uvnitř snu.' },
    { id: '3', title: 'Interstellar', year: '2014', poster: 'https://placehold.co/100x150/000000/FFF?text=Interstellar', description: 'Cesta do černé díry.' }
  ];

  constructor() { }

  getMovies(searchTerm: string = '') {
    return this.movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getMovieById(id: string) {
    return this.movies.find(movie => movie.id === id);
  }

  getFavoriteIds(): string[] {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }

  isFavorite(id: string): boolean {
    const favorites = this.getFavoriteIds();
    return favorites.includes(id);
  }

  toggleFavorite(id: string) {
    let favorites = this.getFavoriteIds();

    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  getFavoriteMovies(): Movie[] {
    const favIds = this.getFavoriteIds();
    return this.movies.filter(m => favIds.includes(m.id));
  }
}
