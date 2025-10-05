import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactComponent } from '../../../sections/contact/contact.component';
import { ContactService } from '../../../services/contact.service';
import { AlertsComponent } from '../../../shared/alerts/alerts.component';


@Component({
  selector: 'app-unprocessed-products',
  standalone: true,
  imports: [CommonModule, AlertsComponent, ContactComponent, ReactiveFormsModule],
  templateUrl: './unprocessed-products.component.html',
  styleUrl: './unprocessed-products.component.scss'
})
export class UnprocessedProductsComponent implements OnDestroy {

  @ViewChild('productModal') productModal?: ElementRef<HTMLDivElement>;
  @ViewChild('contactUsModal') contactUsModal?: ElementRef<HTMLDivElement>;

  selectedProduct?: {
    id: number,
    image: string,
    title: string,
    description: string,
    children: { id: number, title: string, description: string }[]
  };

  unprocessedProducts: {
    id: number,
    image: string,
    title: string,
    description: string,
    children: { id: number, title: string, description: string }[]
  }[] = [
      {
        id: 1,
        image: 'sugar.jpg',
        title: `Azúcares y derivados`,
        description: `Incluye azúcares de diferentes grados ICUMSA, panela y melazas con altos estándares de pureza y calidad para exportación.`,
        children: [
          { id: 1, title: 'Azúcar ICUMSA 45', description: 'Azúcar blanca refinada premium (máx. 45 IU), altamente demandada en mercados internacionales para bebidas, confitería y farmacéutica.' },
          { id: 2, title: 'Azúcar ICUMSA 100', description: 'Azúcar blanca estándar, con buena pureza y color intermedio, utilizada en alimentos procesados y consumo directo.' },
          { id: 3, title: 'Azúcar ICUMSA 150', description: 'Azúcar cristal blanco, muy usado en panadería y repostería, con tonalidad ligeramente más oscura que la ICUMSA 45.' },
          { id: 4, title: 'Azúcar ICUMSA 600–800 (VHP)', description: 'Azúcar morena cruda de alta polarización (>99.4%). Se exporta a refinerías internacionales para ser procesada a grado consumo.' },
          { id: 5, title: 'Azúcar ICUMSA 1200 (Raw)', description: 'Azúcar cruda sin refinar, conserva parte de la melaza. Usada en refinerías y en la producción de ron, etanol y derivados.' }
        ]
      },
      {
        id: 2,
        image: 'fruits.jpg',
        title: `Frutas procesadas`,
        description: `Pulpa, jugos concentrados y frutas deshidratadas de origen tropical, listas para la industria internacional.`,
        children: [
          { id: 6, title: 'Pulpa de mango', description: 'Pulpa congelada de mango colombiano, ideal para jugos, néctares, helados y postres.' },
          { id: 7, title: 'Banano deshidratado', description: 'Snack natural, libre de aditivos, con larga vida útil. Muy demandado en mercados de snacks saludables.' },
          { id: 8, title: 'Jugo concentrado de piña', description: 'Concentrado natural de piña, utilizado en bebidas, repostería y coctelería internacional.' },
          { id: 9, title: 'Pulpa de fresa', description: 'Producto congelado para uso industrial en jugos, yogures y postres. Conserva el sabor auténtico de la fruta.' },
          { id: 10, title: 'Guayaba deshidratada', description: 'Fruta tropical deshidratada con alto valor nutritivo, ideal como snack gourmet o ingrediente en cereales y repostería.' }
        ]
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
        title: `Café y cacao procesados`,
        description: `Café tostado, molido y soluble, además de cacao en polvo y chocolates, reconocidos por su calidad de origen colombiano.`,
        children: [
          { id: 11, title: 'Café tostado en grano', description: 'Granos de café 100% arábica, seleccionados y tostados, listos para barismo y exportación gourmet.' },
          { id: 12, title: 'Café molido', description: 'Café de origen colombiano, molido fino o medio, apto para métodos tradicionales e industriales.' },
          { id: 13, title: 'Café soluble', description: 'Café instantáneo de alta calidad, práctico y con gran aceptación en mercados internacionales.' },
          { id: 14, title: 'Cacao en polvo', description: 'Cacao natural y alcalinizado, usado en repostería, bebidas y alimentos industriales.' },
          { id: 15, title: 'Chocolate en barras y coberturas', description: 'Productos de cacao colombiano con alto porcentaje de pureza, listos para uso industrial o consumo directo.' }
        ]
      },
      {
        id: 4,
        image: 'beans.jpg',
        title: `Granos y cereales transformados`,
        description: `Harinas y derivados de maíz, arroz, avena y quinua, que aportan valor agregado a la panadería, bebidas y alimentos balanceados.`,
        children: [
          { id: 16, title: 'Harina de maíz', description: 'Ingrediente principal en arepas, tortillas y snacks. Exportada a mercados latinoamericanos y europeos.' },
          { id: 17, title: 'Harina de arroz', description: 'Producto sin gluten, muy utilizado en panadería y repostería internacional.' },
          { id: 18, title: 'Avena en hojuelas', description: 'Alimento nutritivo y versátil, consumido como cereal o ingrediente en panificación.' },
          { id: 19, title: 'Cebada perlada', description: 'Grano utilizado en la industria cervecera y en alimentos balanceados.' },
          { id: 20, title: 'Quinua', description: 'Superalimento andino con alto contenido proteico, exportado como grano, harina o expandida.' }
        ]
      },
      {
        id: 5,
        image: 'tuberculos.webp',
        title: `Tubérculos`,
        description: `Tubérculos empacados al vacío y derivados procesados, listos para exportación.`,
        children: [
          { id: 21, title: 'Yuca empacada al vacío', description: 'Yuca fresca pelada y empacada al vacío, con mayor vida útil y lista para cocinar.' },
          { id: 22, title: 'Papa empacada al vacío', description: 'Papa seleccionada de alta calidad, empacada para conservación y exportación.' },
          { id: 23, title: 'Batata (camote)', description: 'Tubérculo nutritivo y versátil, con creciente demanda en gastronomía internacional.' },
          { id: 24, title: 'Harina de yuca (tapioca)', description: 'Harina sin gluten obtenida de la yuca, utilizada en panadería y cocina asiática.' },
          { id: 25, title: 'Papa precocida congelada', description: 'Papa cortada y precocida, lista para freír. Muy usada en cadenas de comida rápida y restaurantes.' }
        ]
      }
    ];


  loading = false;
  successMsg = '';
  errorMsg = '';
  contactUsForm!: FormGroup;
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  constructor() { }
  ngOnInit() { this.initForm(); }

  ngOnDestroy(): void { this.closeOpenModals(); }

  @HostListener('window:popstate')
  onBrowserBack(): void { this.closeOpenModals(); }

  initForm() {
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

  contactUs() {
    this.successMsg = '';
    this.errorMsg = '';

    const formContact = this.contactUsForm.value;
    if (!formContact.terms) {
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

  onCloseSuccess() { this.successMsg = ''; }
  onCloseError() { this.errorMsg = ''; }

  // ...existing code...

  private hideModal() {
    this.forceCloseModal(this.contactUsModal);
  }

  private closeOpenModals(): void {
    this.forceCloseModal(this.productModal);
    this.forceCloseModal(this.contactUsModal);
  }

  private forceCloseModal(modalRef?: ElementRef<HTMLDivElement>): void {
    const element = modalRef?.nativeElement;
    if (!element || typeof window === 'undefined') {
      return;
    }
    const bs = (window as any)?.bootstrap;
    if (bs?.Modal) {
      const instance = bs.Modal.getInstance(element) || new bs.Modal(element);
      instance.hide();
    }
    element.classList.remove('show');
    element.setAttribute('aria-hidden', 'true');
    element.style.display = 'none';
    this.cleanupModalArtifacts();
  }

  private cleanupModalArtifacts(): void {
    if (typeof document === 'undefined') {
      return;
    }
    const body = document.body;
    body.classList.remove('modal-open');
    body.style.removeProperty('padding-right');
    body.style.removeProperty('overflow');
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
  }
}
