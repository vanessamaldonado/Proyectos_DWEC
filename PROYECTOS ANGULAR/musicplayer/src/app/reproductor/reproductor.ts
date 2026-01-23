import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  imports: [],
  templateUrl: './reproductor.html',
  styleUrl: './reproductor.css',
})
export class Reproductor {
  @Input() canciones: string[] = [];
  @Input() intervaloMs: number = 2000;

  @Output() cambioCancion = new EventEmitter<string>();

  actual: string = '';
  pos: number = 0;

  ngOnInit() {
    if (this.canciones.length === 0) return;

    this.actual = this.canciones[this.pos];
    this.cambioCancion.emit(this.actual);

    setInterval(() => {
      this.pos++;
      if (this.pos >= this.canciones.length) this.pos = 0;

      this.actual = this.canciones[this.pos];
      this.cambioCancion.emit(this.actual);
    }, this.intervaloMs);
  }
}
