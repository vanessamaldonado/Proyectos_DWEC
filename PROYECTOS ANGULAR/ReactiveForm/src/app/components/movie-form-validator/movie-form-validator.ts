import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-form-validator',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-form-validator.html',
  styleUrl: './movie-form-validator.css',
})
export class MovieFormValidator {
  // Formulario principal
  movieForm: FormGroup;
  // Campos del formulario
  name: FormControl;
  duration: FormControl;
  director: FormControl;

  constructor() {
    // Campo obligatorio
    this.name = new FormControl('',Validators.required);      // valor inicial vacío
    // Campo con varios validators (ejemplo: requerido y valor máximo)
    this.duration = new FormControl('', [
      Validators.required,
      Validators.max(300) // Duración máxima: 300 minutos
    ]);
    // Campo sin validación
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
    // Limpiar el formulario después del envío
    this.movieForm.reset();
  }
}
