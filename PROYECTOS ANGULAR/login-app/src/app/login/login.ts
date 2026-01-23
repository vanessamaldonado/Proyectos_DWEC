import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  
  @Input() user: string = '';
  @Input() pass: string = '';

  //@Output() loginEvent = new EventEmitter<string>();
   loginEvent = output<string>();
   
  login() {
    // Enviar un evento al padre con el mensaje. 
    this.loginEvent.emit(this.user);
  }
}
