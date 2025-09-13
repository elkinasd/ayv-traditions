import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
  }) {
    if (config.title) {
      this.updateTitle(config.title);
      this.meta.updateTag({ property: 'og:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
      this.meta.updateTag({ rel: 'canonical', href: config.url });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }
  }

  // Métodos específicos para páginas
  setHomePageSEO() {
    this.updateMetaTags({
      title: environment.seo.defaultTitle,
      description: environment.seo.defaultDescription,
      keywords: 'exportación colombia, productos agrícolas, comercio internacional, azúcar, café, frutas tropicales',
      url: environment.seo.baseUrl,
      image: environment.seo.defaultImage
    });
  }

  setBriefcaseSEO() {
    this.updateMetaTags({
      title: 'Portafolio de Productos - A&V Traditions',
      description: 'Descubre nuestro portafolio completo de productos colombianos para exportación: procesados y sin procesar.',
      keywords: 'portafolio productos colombianos, exportación, procesados, sin procesar',
      url: `${environment.seo.baseUrl}/portafolio`,
      image: environment.seo.defaultImage
    });
  }

  setProcessedProductsSEO() {
    this.updateMetaTags({
      title: 'Productos Procesados - A&V Traditions',
      description: 'Azúcares refinados, frutas procesadas, café tostado, harinas y aceites vegetales colombianos para exportación.',
      keywords: 'productos procesados colombia, azúcar refinada, café tostado, aceites vegetales',
      url: `${environment.seo.baseUrl}/portafolio/procesados`,
      image: environment.seo.defaultImage
    });
  }

  setUnprocessedProductsSEO() {
    this.updateMetaTags({
      title: 'Productos Sin Procesar - A&V Traditions',
      description: 'Azúcar cruda, frutas frescas, café en grano, cacao y granos colombianos en estado natural para exportación.',
      keywords: 'productos sin procesar colombia, azúcar cruda, café en grano, frutas frescas, cacao',
      url: `${environment.seo.baseUrl}/portafolio/no-procesados`,
      image: environment.seo.defaultImage
    });
  }
}
