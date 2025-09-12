import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactComponent } from '../../contact/contact.component';
import { ContactService } from '../../../services/contact.service';
import { AlertsComponent } from '../../../shared/alerts/alerts.component';


@Component({
  selector: 'app-unprocessed-products',
  standalone: true,
  imports: [ CommonModule, AlertsComponent, ContactComponent, ReactiveFormsModule ],
  templateUrl: './unprocessed-products.component.html',
  styleUrl: './unprocessed-products.component.scss'
})
export class UnprocessedProductsComponent {

  unprocessedProducts: { image: string, title: string, description: string }[] = [
    {
      image: 'fresh-fruits.jpg',
      title: `Frutas frescas`,
      description: `Mangos, bananos, fresas y otras frutas tropicales exportadas en estado fresco, reconocidas por su calidad y sabor natural.`
    },
    {
      image: 'coffee-beans.jpg',
      title: `Café en grano`,
      description: `Café verde en grano de origen colombiano, ideal para tostadores y distribuidores que buscan calidad de exportación.`
    },
    {
      image: 'cocoa-beans.jpg',
      title: `Cacao en grano`,
      description: `Cacao en grano sin procesar, base para la industria chocolatera mundial por su aroma y propiedades únicas.`
    },
    {
      image: 'grains.jpg',
      title: `Granos y cereales`,
      description: `Arroz, maíz, fríjol y otras materias primas agrícolas en su estado natural, destinadas a la industria y al consumo directo.`
    },
    {
      image: 'nuts.jpg',
      title: `Frutos secos y semillas`,
      description: `Nueces, maní, sésamo y otras semillas exportadas sin procesamiento, conservando sus propiedades nutritivas.`
    }
  ]

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
