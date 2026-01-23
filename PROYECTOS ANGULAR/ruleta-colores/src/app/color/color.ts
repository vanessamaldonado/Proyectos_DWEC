import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-color',
  imports: [],
  templateUrl: './color.html',
  styleUrl: './color.css',
})
export class Color {
 @Input() color: string = '';
}
