import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})
export class MovieForm {
// Formulario principal
  movieForm: FormGroup;

  // Campos del formulario
  name: FormControl;
  duration: FormControl;
  director: FormControl;

  constructor() {
    // Inicializar los campos
    this.name = new FormControl('');      // valor inicial vacío
    this.duration = new FormControl('');
    this.director = new FormControl('');

    // Inicializar el formulario con los campos
    this.movieForm = new FormGroup({
      name: this.name,
      duration: this.duration,
      director: this.director
    });
  }

  // Método para manejar el submit del formulario
  handleSubmit() {
    console.log(this.movieForm.value); // obtiene el valor de los campos
  }
}
