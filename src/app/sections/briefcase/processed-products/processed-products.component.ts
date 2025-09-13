import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactComponent } from '../../contact/contact.component';
import { ContactService } from '../../../services/contact.service';
import { AlertsComponent } from '../../../shared/alerts/alerts.component';

@Component({
  selector: 'app-processed-products',
  standalone: true,
  imports: [CommonModule, AlertsComponent, ContactComponent, ReactiveFormsModule ],
  templateUrl: './processed-products.component.html',
  styleUrl: './processed-products.component.scss'
})
export class ProcessedProductsComponent {

  @ViewChild('contactUsModal') contactUsModal!: ElementRef;
  selectedProduct?: { image: string, title: string, description: string };
  processedProducts: { image: string, title: string, description: string, }[] = [
    {
      image: 'sugar.jpg',
      title: `Azúcares y derivados`,
      description: `Incluye azúcar refinada, morena, panela y melazas con altos estándares de pureza para la industria alimenticia y bebidas.`
    },
    {
      image: 'fruits.jpg',
      title: `Frutas procesadas`,
      description: `Pulpa, jugos concentrados y frutas deshidratadas como mango, fresa y banano, listos para consumo o uso industrial.`
    },
    {
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
      title: `Café y cacao procesados`,
      description: `Café tostado, molido y soluble, además de cacao en polvo y chocolates, reconocidos por su aroma y calidad de origen.`
    },
    {
      image: 'beans.jpg',
      title: `Granos y cereales transformados`,
      description: `Harinas y derivados de maíz, arroz y otros cereales que aportan valor agregado a la panadería y alimentos balanceados.`
    },
    {
      image: 'tuberculos.webp',
      title: `Tubérculos`,
      description: `Actualmente contamos con yuca y papa empacados al vacío, productos frescos y de alta calidad listos para su comercialización.`
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
          this.hideModal();
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

    private hideModal(){
      const el = this.contactUsModal?.nativeElement as HTMLElement | undefined;
      const bs = (window as any).bootstrap;
      if (el && bs?.Modal) {
        const instance = bs.Modal.getInstance(el) || new bs.Modal(el);
        instance.hide();
      }
    }
}
