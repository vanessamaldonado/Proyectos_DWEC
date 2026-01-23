import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  imports: [],
  templateUrl: './cronometro.html',
  styleUrl: './cronometro.css',
})
export class Cronometro {
 segundo = 0;
  @Input() inicio: number = 0;
  @Output() multiplo10 = new EventEmitter<number>();

  ngOnInit() {
    this.segundo = this.inicio;
    setInterval(() => {
      this.segundo++;
      if (this.segundo % 10 == 0)
        this.multiplo10.emit(this.segundo);
    }, 1000);
  }
}
