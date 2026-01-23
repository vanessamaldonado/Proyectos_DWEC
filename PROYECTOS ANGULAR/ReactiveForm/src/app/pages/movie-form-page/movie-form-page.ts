import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { MovieFormValidator } from '../../components/movie-form-validator/movie-form-validator';

@Component({
  selector: 'app-movie-form-page',
  imports: [Header, MovieFormValidator],
  templateUrl: './movie-form-page.html',
  styleUrl: './movie-form-page.css',
})
export class MovieFormPage {

}
