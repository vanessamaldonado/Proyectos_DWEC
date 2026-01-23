import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

   contact='';
   contactForm: FormGroup;
   name: FormControl;
   email: FormControl;
   message: FormControl;
  
   constructor() {
  
    this.name = new FormControl('',[Validators.required, Validators.minLength(10)]),
    this.email= new FormControl('',[Validators.required, Validators.email]),
    this.message= new FormControl('',[Validators.required, Validators.maxLength(500)])
  
    this.contactForm = new FormGroup({
      name:this.name,
      email:this.email,
      message:this.message
    });
  }
  submit() {
       this.contact = `Nombre=${this.contactForm.value.name}
                Mail=${this.contactForm.value.email}
                Mensaje=${this.contactForm.value.message}
                `;
       this.contactForm.reset();         
  }
}
