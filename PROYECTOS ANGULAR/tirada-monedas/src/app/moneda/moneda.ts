import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moneda',
  imports: [],
  templateUrl: './moneda.html',
  styleUrl: './moneda.css',
})
export class Moneda {
@Input() caraCruz: string = ''; // Recibe 'cara' o 'cruz'
}
