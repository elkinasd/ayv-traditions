import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactService } from '../../services/contact.service';
import { AlertsComponent } from '../../shared/alerts/alerts.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, AlertsComponent ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  services = [
    { icon: 'email', title: 'Correo electrónico' },
    { icon: 'phone', title: 'Teléfono' }
  ];

  loading = false;
  successMsg = '';
  errorMsg = '';
  contactUsForm!: FormGroup;
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  constructor(){}
  ngOnInit(){ this.initForm(); }

  initForm(){
    this.contactUsForm = this.fb.group({
      fullName: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      issue: ['', Validators.required],
      channel: ['', Validators.required],
      request: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  contactUs(){
    this.successMsg = '';
    this.errorMsg = '';

    const formContact = this.contactUsForm.value;
    if(!formContact.terms){
      this.errorMsg = 'Debes aceptar los términos y condiciones.';
      return;
    }

    this.loading = true;
    this.contactUsForm.disable({ emitEvent: false });

    this.contactService.sendMail(formContact).subscribe({
      next: () => {
        this.loading = false;
        this.contactUsForm.enable({ emitEvent: false });
        this.successMsg = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
        this.contactUsForm.reset({ terms: false });
      },
      error: () => {
        this.loading = false;
        this.contactUsForm.enable({ emitEvent: false });
        this.errorMsg = 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.';
      }
    });
  }

  onCloseSuccess(){ this.successMsg = ''; }
  onCloseError(){ this.errorMsg = ''; }
}
