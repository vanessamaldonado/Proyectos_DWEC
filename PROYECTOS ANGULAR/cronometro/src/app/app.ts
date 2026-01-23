import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cronometro } from './cronometro/cronometro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cronometro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mensaje = '';

  actualizar(t: number) {
    this.mensaje = t + '(se actualiza cada 10 segundos)';
  }
}
