import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactComponent } from '../../../sections/contact/contact.component';
import { ContactService } from '../../../services/contact.service';
import { AlertsComponent } from '../../../shared/alerts/alerts.component';

@Component({
  selector: 'app-processed-products',
  standalone: true,
  imports: [CommonModule, AlertsComponent, ContactComponent, ReactiveFormsModule],
  templateUrl: './processed-products.component.html',
  styleUrl: './processed-products.component.scss'
})
export class ProcessedProductsComponent implements OnDestroy {
  @ViewChild('productModal') productModal?: ElementRef<HTMLDivElement>;
  @ViewChild('contactUsModal') contactUsModal?: ElementRef<HTMLDivElement>;
  selectedProduct?: {
    id: number,
    image: string,
    title: string,
    description: string,
    children: { id: number, title: string, image?: string, description: string }[]
  };

  processedProducts: {
    id: number,
    image: string,
    title: string,
    description: string,
    children: { id: number, title: string, image?: string, description: string }[]
  }[] =
    [
      {
        id: 1,
        image: `sugar.jpg`,
        title: `Azúcares y derivados`,
        description: `Incluye azúcares de diferentes grados ICUMSA, panela y melazas con altos estándares de pureza y calidad para exportación.`,
        children: [
          { id: 1, title: `Azúcar ICUMSA 45`, description: `Azúcar blanca refinada premium (máx. 45 IU), altamente demandada en mercados internacionales para bebidas, confitería y farmacéutica.` },
          { id: 2, title: `Azúcar ICUMSA 100`, description: `Azúcar blanca estándar, con buena pureza y color intermedio, utilizada en alimentos procesados y consumo directo.` },
          { id: 3, title: `Azúcar ICUMSA 150`, description: `Azúcar cristal blanco, muy usado en panadería y repostería, con tonalidad ligeramente más oscura que la ICUMSA 45.` },
          { id: 4, title: `Azúcar ICUMSA 600–800 (VHP)`, description: `Azúcar morena cruda de alta polarización (>99.4%). Se exporta a refinerías internacionales para ser procesada a grado consumo.` },
          { id: 5, title: `Azúcar ICUMSA 1200 (Raw)`, description: `Azúcar cruda sin refinar, conserva parte de la melaza. Usada en refinerías y en la producción de ron, etanol y derivados.` }
        ]
      },
      {
        id: 2,
        image: `fruits.jpg`,
        title: `Frutas procesadas`,
        description: `Pulpa, jugos concentrados y frutas deshidratadas elaboradas a partir de frutas tropicales seleccionadas, ideales para la industria alimentaria internacional.`,
        children: [
          { id: 6, title: `Banano`, image: `fruits/banano.png`, description: `Fruta alargada de cáscara amarilla suave y pulpa cremosa, dulce y ligera. Al morderla se siente fresca, saciante y naturalmente energética, perfecta para comer sola o mezclar en preparaciones.` },
          { id: 7, title: `Borojó`, image: `fruits/borojo.png`, description: `Tiene una pulpa espesa de color marrón oscuro y un sabor intenso, entre ácido y dulce, que llena la boca con notas profundas. Su textura densa y su aroma fuerte la hacen inconfundible en bebidas o preparaciones tradicionales.` },
          { id: 8, title: `Ciruela`, image: `fruits/Ciruela.png`, description: `Pequeña y redonda, con piel brillante que va del rojo al morado. Al morderla, la pulpa jugosa libera un sabor dulce con un toque ácido que la vuelve refrescante y ligera.` },
          { id: 9, title: `Corozo`, image: `fruits/corozo.png`, description: `Fruta pequeña de color rojo intenso, de piel firme y pulpa jugosa. Su sabor es ácido con un leve dulzor, ideal para jugos frescos que despiertan el paladar.` },
          { id: 10, title: `Curuba`, image: `fruits/curuba.png`, description: `Fruta alargada de cáscara delgada y suave. Por dentro guarda una pulpa anaranjada llena de semillas pequeñas, con un sabor delicado, ligeramente ácido y muy aromático.` },
          { id: 11, title: `Durazno`, image: `fruits/durazno.png`, description: `Fruta redonda de piel aterciopelada y pulpa jugosa de color amarillo. Su sabor es dulce con un ligero toque ácido, y al comerla se siente suave y refrescante.` },
          { id: 12, title: `Feijoa`, image: `fruits/Feijoa.png`, description: `Fruta ovalada de piel verde y aroma intenso que se percibe apenas se abre. Su pulpa es suave, con un sabor dulce y ácido a la vez, muy particular y perfumado.` },
          { id: 13, title: `Fresa`, image: `fruits/fresas.png`, description: `Fruta pequeña de color rojo brillante, con un aroma dulce que se siente desde lejos. Su pulpa es jugosa y suave, con un sabor equilibrado entre dulce y ligeramente ácido.` },
          { id: 14, title: `Guanábana`, image: `fruits/guanabana.png`, description: `Fruta grande y espinosa por fuera, pero blanca y cremosa por dentro. Su pulpa tiene un sabor suave, dulce y refrescante, con un toque ácido muy agradable.` },
          { id: 15, title: `Guayaba`, image: `fruits/guayaba.png`, description: `Fruta redonda o alargada, de piel verde o amarilla y pulpa rosada o blanca con pequeñas semillas. Su sabor es intenso y aromático, combinando dulzura con un toque ácido característico.` },
          { id: 16, title: `Limón`, image: `fruits/limon.png`, description: `Fruta cítrica de piel amarilla o verde brillante. Su jugo es ácido y refrescante, con un aroma que despierta al instante, ideal para equilibrar sabores y aportar frescura.` },
          { id: 17, title: `Lulo`, image: `fruits/lulo.png`, description: `Fruta redonda de piel anaranjada y pulpa verde vibrante. Su sabor es único: ácido, fresco y ligeramente herbal, ideal para jugos que quitan la sed de una.` },
          { id: 18, title: `Mandarina`, image: `fruits/mandarina.png`, description: `Cítrico pequeño de cáscara delgada y fácil de pelar. Su pulpa es jugosa y dulce, con un aroma suave que se queda en las manos después de pelarla.` },
          { id: 19, title: `Maracuyá`, image: `fruits/maracuya.png`, description: `Fruta redonda de cáscara gruesa que al abrir revela una pulpa dorada, llena de semillas brillantes. Su sabor es intenso, ácido y perfumado, perfecto para jugos y postres.` },
          { id: 20, title: `Melón`, image: `fruits/melon.png`, description: `Fruta grande de cáscara clara y pulpa jugosa de color anaranjado o verde. Su sabor es suave y dulce, muy refrescante, ideal para días calurosos.` },
          { id: 21, title: `Mora`, image: `fruits/mora.png`, description: `Fruta formada por pequeñas bolitas brillantes que se unen en racimos. Su sabor es dulce con un toque ácido que llena la boca de frescura y un color profundo.` },
          { id: 22, title: `Naranja`, image: `fruits/naranja.png`, description: `Cítrico redondo de cáscara firme y pulpa jugosa, de sabor dulce con un punto ácido perfecto. Al exprimirla desprende un aroma fresco y vibrante.` },
          { id: 23, title: `Níspero`, image: `fruits/nispero.jpg`, description: `Fruta pequeña y dulce, de piel amarilla y pulpa suave y jugosa. Su sabor recuerda a una mezcla entre durazno y pera, con un toque tropical muy agradable.` },
          { id: 24, title: `Papaya`, image: `fruits/papaya.png`, description: `Fruta alargada de piel anaranjada y pulpa suave, dulce y ligeramente almizclada. Al comerla se deshace fácilmente en la boca, liberando un sabor tropical característico.` },
          { id: 25, title: `Pera`, image: `fruits/pera.png`, description: `Fruta de forma alargada, con piel fina y pulpa blanca y jugosa. Su sabor es suave y dulce, refrescante y muy ligera al paladar.` },
          { id: 26, title: `Piña`, image: `fruits/piña.png`, description: `Fruta tropical de corteza gruesa y coronada por hojas verdes. Su pulpa amarilla es jugosa, dulce y ácida al mismo tiempo, con un aroma que llena el ambiente.` },
          { id: 27, title: `Tamarindo`, image: `fruits/tamarindo.png`, description: `Fruta de vaina alargada, que guarda una pulpa marrón pegajosa y de sabor agridulce. Al probarla, se mezcla lo dulce con un toque ácido muy característico.` },
          { id: 28, title: `Tomate de árbol`, image: `fruits/tomate-de-arbol.png`, description: `Fruta ovalada de piel lisa y brillante. Su pulpa anaranjada es jugosa, con un sabor entre dulce y ácido que la hace ideal para jugos o salsas.` },
          { id: 29, title: `Uchuva`, image: `fruits/uchuva.png`, description: `Pequeña y redonda, envuelta en una delicada cáscara como un farolito. Su pulpa es dorada y jugosa, con un sabor agridulce intenso y refrescante.` },
          { id: 30, title: `Uva`, image: `fruits/uva.png`, description: `Fruta pequeña, redonda y jugosa, de piel delgada y pulpa dulce que explota suavemente al morderla. Su sabor varía entre dulce intenso y ligeramente ácido según la variedad.` },
          { id: 31, title: `Naranja Piña`, image: `fruits/naranja-piña.png`, description: `Combinación natural que une la frescura cítrica de la naranja con el dulzor jugoso de la piña. Juntas crean un sabor equilibrado, tropical y muy aromático.` },
          { id: 32, title: `Frutos Rojos`, image: `fruits/frutos-rojos.png`, description: `Mezcla vibrante de frutas como fresas, moras y arándanos, que combinan dulzura, acidez y aroma fresco en cada bocado.` },
          { id: 33, title: `Maracumango`, image: `fruits/maracumango.png`, description: `Fusión tropical de maracuyá y mango que une la acidez perfumada del primero con la suavidad dulce del segundo, creando un sabor intenso y muy jugoso.` }
        ]

      },
      {
        id: 3,
        image: `https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3`,
        title: `Café y cacao procesados`,
        description: `Café tostado, molido y soluble, además de cacao en polvo y chocolates, reconocidos por su calidad de origen colombiano.`,
        children: [
          { id: 11, title: `Café tostado en grano`, description: `Granos de café 100% arábica, seleccionados y tostados, listos para barismo y exportación gourmet.` },
          { id: 12, title: `Café molido`, description: `Café de origen colombiano, molido fino o medio, apto para métodos tradicionales e industriales.` },
          { id: 13, title: `Café soluble`, description: `Café instantáneo de alta calidad, práctico y con gran aceptación en mercados internacionales.` },
          { id: 14, title: `Cacao en polvo`, description: `Cacao natural y alcalinizado, usado en repostería, bebidas y alimentos industriales.` },
          { id: 15, title: `Chocolate en barras y coberturas`, description: `Productos de cacao colombiano con alto porcentaje de pureza, listos para uso industrial o consumo directo.` }
        ]
      },
      {
        id: 4,
        image: `beans.jpg`,
        title: `Granos y cereales transformados`,
        description: `Harinas y derivados de maíz, arroz, avena y quinua, que aportan valor agregado a la panadería, bebidas y alimentos balanceados.`,
        children: [
          { id: 16, title: `Harina de maíz`, description: `Ingrediente principal en arepas, tortillas y snacks. Exportada a mercados latinoamericanos y europeos.` },
          { id: 17, title: `Harina de arroz`, description: `Producto sin gluten, muy utilizado en panadería y repostería internacional.` },
          { id: 18, title: `Avena en hojuelas`, description: `Alimento nutritivo y versátil, consumido como cereal o ingrediente en panificación.` },
          { id: 19, title: `Cebada perlada`, description: `Grano utilizado en la industria cervecera y en alimentos balanceados.` },
          { id: 20, title: `Quinua`, description: `Superalimento andino con alto contenido proteico, exportado como grano, harina o expandida.` }
        ]
      },
      {
        id: 5,
        image: `tuberculos.webp`,
        title: `Tubérculos`,
        description: `Tubérculos empacados al vacío y derivados procesados, listos para exportación.`,
        children: [
          { id: 21, title: `Yuca empacada al vacío`, description: `Yuca fresca pelada y empacada al vacío, con mayor vida útil y lista para cocinar.` },
          { id: 22, title: `Papa empacada al vacío`, description: `Papa seleccionada de alta calidad, empacada para conservación y exportación.` },
          { id: 23, title: `Batata (camote)`, description: `Tubérculo nutritivo y versátil, con creciente demanda en gastronomía internacional.` },
          { id: 24, title: `Harina de yuca (tapioca)`, description: `Harina sin gluten obtenida de la yuca, utilizada en panadería y cocina asiática.` },
          { id: 25, title: `Papa precocida congelada`, description: `Papa cortada y precocida, lista para freír. Muy usada en cadenas de comida rápida y restaurantes.` }
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
