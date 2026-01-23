import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Reproductor } from './reproductor/reproductor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Reproductor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 // ARRAY de canciones (playlist)
  playlist: string[] = ['Master of Puppets', 'Highway to Hell', 'The Final Countdown'];

  mensaje = '';

  actualizar(cancion: string) {
    this.mensaje = 'Cambio de canción: ' + cancion;
  }
}
