import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Moneda } from './moneda/moneda';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Moneda],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 moneda1: string = this.lanzarMoneda();
  moneda2: string = this.lanzarMoneda();
  moneda3: string = this.lanzarMoneda();
  resultado: string = '';

  lanzarMoneda(): string {
    return Math.random() < 0.5 ? 'cara' : 'cruz';
  }

  tirar() {
    this.moneda1 = this.lanzarMoneda();
    this.moneda2 = this.lanzarMoneda();
    this.moneda3 = this.lanzarMoneda();

    if (this.moneda1 === this.moneda2 && this.moneda1 === this.moneda3) {
      this.resultado = '¡Ganó!';
    } else {
      this.resultado = 'Perdió';
    }
  }
}
