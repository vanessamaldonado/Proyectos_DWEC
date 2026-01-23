import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dado',
  imports: [],
  templateUrl: './dado.html',
  styleUrl: './dado.css',
})
export class Dado {
 @Input() valor: string = "";
}
