import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LandinPageComponent } from "./pages/landin-page/landin-page.component";
import { PerformanceService } from './services/performance.service';

// Declarar gtag como función global
declare global {
  interface Window {
    gtag: any;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandinPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ayv-traditions';

  constructor(
    private performance: PerformanceService,
    private router: Router
  ) {
    // Tracking automático de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verificar que gtag esté disponible
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        // Trackear la nueva página visitada
        window.gtag('config', 'G-MEXTXVKSQL', {
          page_path: event.urlAfterRedirects,
          page_title: this.getPageTitle(event.urlAfterRedirects)
        });

        // También enviar evento personalizado
        window.gtag('event', 'page_view', {
          page_title: this.getPageTitle(event.urlAfterRedirects),
          page_location: window.location.href,
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  ngOnInit() {
    // El servicio se inicializa automáticamente y comienza a monitorear
    this.performance.trackConnectionInfo();
  }

  // Método para obtener títulos de página dinámicos
  private getPageTitle(url: string): string {
    // Títulos específicos para páginas importantes (opcional)
    const customTitles: { [key: string]: string } = {
      '/': 'Página Principal - A&V Traditions',
      '/portafolio': 'Portafolio - A&V Traditions'
    };

    // Si hay un título personalizado, usarlo
    if (customTitles[url]) {
      return customTitles[url];
    }

    // Generar título automáticamente desde la URL
    return this.generateTitleFromUrl(url);
  }

  // Método que convierte URL en título legible automáticamente
  private generateTitleFromUrl(url: string): string {
    if (url === '/') return 'Página Principal - A&V Traditions';

    // Remover slash inicial y dividir por segmentos
    const segments = url.substring(1).split('/');

    // Convertir cada segmento en palabras legibles
    const titleParts = segments.map(segment => {
      return segment
        .replace(/[-_]/g, ' ')           // Reemplazar guiones y guiones bajos con espacios
        .replace(/([a-z])([A-Z])/g, '$1 $2')  // Separar camelCase
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    });

    // Crear título final
    const title = titleParts.join(' | ');
    return `${title} - A&V Traditions`;
  }
}
