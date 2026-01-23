import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dado } from './components/dado/dado';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dado],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  valor1: number = this.retornarAleatorio()
  valor2: number = this.retornarAleatorio()
  valor3: number = this.retornarAleatorio()
  resultado: string = "";

  retornarAleatorio() {
    return Math.floor(Math.random() * 6) + 1;
  }

  tirar() {
    this.valor1 = this.retornarAleatorio();
    this.valor2 = this.retornarAleatorio();
    this.valor3 = this.retornarAleatorio();
    if (this.valor1 == this.valor2 && this.valor1 == this.valor3)
      this.resultado = 'Ganó';
    else
      this.resultado = 'Perdió';
  }
}
