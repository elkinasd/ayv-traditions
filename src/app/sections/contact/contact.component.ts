import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  loading = false; successMsg=''; errorMsg='';
  contactUsForm!: FormGroup;
  private fb = inject(FormBuilder)

  constructor(){}
  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.contactUsForm = this.fb.group({
      fullName: ['', Validators.required],
      CompanyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      issue: ['', Validators.required],
      channel: ['', Validators.required],
      request: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  contactUs(){
    const formContact = this.contactUsForm.value;
    console.log(formContact)
  }

  services = [
    {
      icon: 'email',
      title: 'Correo electrónico',
    },
    {
      icon: 'phone',
      title: 'Teléfono',
    }
  ];

}
