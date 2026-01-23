import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Color } from './color/color';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Color],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  coloresDisponibles: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];

  color1: string = this.colorAleatorio();
  color2: string = this.colorAleatorio();
  color3: string = this.colorAleatorio();

  resultado: string = '';

  colorAleatorio(): string {
    const indice = Math.floor(Math.random() * this.coloresDisponibles.length);
    return this.coloresDisponibles[indice];
  }

  girar() {
    this.color1 = this.colorAleatorio();
    this.color2 = this.colorAleatorio();
    this.color3 = this.colorAleatorio();

    if (this.color1 === this.color2 && this.color1 === this.color3) {
      this.resultado = '¡Ganó!';
    } else {
      this.resultado = 'Perdió';
    }
  }
}
