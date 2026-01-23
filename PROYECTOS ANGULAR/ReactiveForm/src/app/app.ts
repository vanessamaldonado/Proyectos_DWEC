import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieForm } from './components/movie-form/movie-form';
import { MovieFormValidator } from './components/movie-form-validator/movie-form-validator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieForm, MovieFormValidator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ReactiveForm');
}
