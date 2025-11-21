import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true,
})
export class LazyLoadDirective implements OnInit {
  private el = inject(ElementRef);

  @Input() appLazyLoad!: string;
  @Input() placeholder =
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="%23f0f0f0"/></svg>';

  ngOnInit() {
    this.setPlaceholder();
    this.observeImage();
  }

  private setPlaceholder() {
    this.el.nativeElement.src = this.placeholder;
    this.el.nativeElement.style.transition = 'opacity 0.3s ease';
    this.el.nativeElement.style.opacity = '0.7';
  }

  private observeImage() {
    // Verificar si IntersectionObserver está disponible
    if (!('IntersectionObserver' in window)) {
      // Fallback para navegadores que no soporten IntersectionObserver
      this.loadImage();
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            observer.unobserve(this.el.nativeElement);
          }
        });
      },
      {
        // Cargar imagen cuando esté 10% visible
        threshold: 0.1,
        // Cargar 100px antes de que sea visible
        rootMargin: '100px 0px',
      }
    );

    observer.observe(this.el.nativeElement);
  }

  private loadImage() {
    const img = new Image();

    img.onload = () => {
      this.el.nativeElement.src = this.appLazyLoad;
      this.el.nativeElement.style.opacity = '1';
    };

    img.onerror = () => {
      // En caso de error, mostrar una imagen de placeholder
      this.el.nativeElement.src =
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">Imagen no disponible</text></svg>';
      this.el.nativeElement.style.opacity = '1';
    };

    img.src = this.appLazyLoad;
  }
}
