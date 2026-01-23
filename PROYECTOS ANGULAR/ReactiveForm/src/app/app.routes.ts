import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Movies } from './pages/movies/movies';
import { MovieFormPage } from './pages/movie-form-page/movie-form-page';

export const routes: Routes = [
  { path: '', component: Home },          // Home -> /
  { path: 'movies', component: Movies },  // Movies -> /movies
  { path: 'create', component: MovieFormPage }, // Create -> /create
];
