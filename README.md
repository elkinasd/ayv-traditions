# Guía Paso a Paso: Implementar SEO, Analytics y Performance

## Introducción

Esta guía te ayudará a transformar tu sitio web Angular en una máquina optimizada para motores de búsqueda, con análisis completos de usuarios y rendimiento superior. 

**¿Por qué es importante?**
- **SEO**: Más visibilidad en Google = más visitantes orgánicos
- **Analytics**: Entender a tus usuarios para tomar mejores decisiones
- **Performance**: Sitios más rápidos = mejor experiencia y mejor posicionamiento

## Lo Que Ya Tienes Implementado ✅

Tu proyecto Angular ya cuenta con una base sólida:

### SEO Básico
- ✅ Codificación UTF-8 para caracteres especiales
- ✅ Meta viewport para dispositivos móviles
- ✅ Título de página básico
- ✅ Favicon (icono del navegador)
- ✅ Bootstrap para diseño responsive
- ✅ Estructura semántica básica (`<main>`, `<footer>`)

### Optimización Base
- ✅ SCSS organizado con variables de colores
- ✅ Componentes modulares para fácil mantenimiento
- ✅ Sistema de rutas con Angular Router
- ✅ Imágenes organizadas en carpeta `public/`

## Lo Que Falta y Por Qué Es Crucial ❌

### SEO Crítico (Sin esto, Google no te encuentra bien)
- ❌ **Meta descriptions**: Descripción que aparece en resultados de Google
- ❌ **Open Graph**: Para compartir bonito en redes sociales
- ❌ **Angular Universal (SSR)**: Para que Google lea tu contenido
- ❌ **Sitemap.xml**: Mapa para que Google explore tu sitio
- ❌ **Robots.txt**: Instrucciones para motores de búsqueda
- ❌ **Schema markup**: Datos estructurados para resultados enriquecidos
- ❌ **Alt text en imágenes**: Accesibilidad y SEO
- ❌ **Idioma en español**: Actualmente está en inglés

### Analytics (Sin esto, navegas a ciegas)
- ❌ **Google Analytics**: Estadísticas de visitantes
- ❌ **Google Tag Manager**: Gestión centralizada de códigos
- ❌ **Eventos personalizados**: Seguimiento de acciones específicas

### Performance (Velocidad = mejor posicionamiento)
- ❌ **Lazy loading**: Cargar imágenes solo cuando se necesitan
- ❌ **WebP**: Formato de imagen más eficiente
- ❌ **Service Workers**: Caché inteligente para velocidad

---

## Implementación Paso a Paso

### 🎯 FASE 1: SEO Básico Mejorado

#### Paso 1: Configurar idioma en español

**Archivo:** `src/index.html`

```html
<!-- ANTES -->
<html lang="en">

<!-- DESPUÉS -->
<html lang="es">
```

#### Paso 2: Mejorar meta tags básicos

**Archivo:** `src/index.html`

```html
<head>
  <meta charset="utf-8">
  <title>A&V Traditions - Comercio Internacional de Productos Colombianos</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- META TAGS NUEVOS -->
  <meta name="description" content="Comercio global con confianza local. Exportamos productos agrícolas colombianos de alta calidad al mundo. Azúcar, café, frutas y más.">
  <meta name="keywords" content="exportación colombia, productos agrícolas, comercio internacional, azúcar, café, frutas tropicales">
  <meta name="author" content="A&V Traditions">
  <meta name="robots" content="index, follow">
  
  <!-- OPEN GRAPH PARA REDES SOCIALES -->
  <meta property="og:title" content="A&V Traditions - Comercio Internacional">
  <meta property="og:description" content="Conectamos la riqueza de Colombia con el mundo mediante soluciones de comercio internacional">
  <meta property="og:image" content="https://tudominio.com/logo-with-name.png">
  <meta property="og:url" content="https://tudominio.com">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="A&V Traditions">
  
  <!-- TWITTER CARDS -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="A&V Traditions - Comercio Internacional">
  <meta name="twitter:description" content="Conectamos la riqueza de Colombia con el mundo">
  <meta name="twitter:image" content="https://tudominio.com/logo-with-name.png">
  
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
```

#### Paso 3: Crear servicio de SEO dinámico

**Crear archivo:** `src/app/services/seo.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

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
}
```

#### Paso 4: Implementar SEO en componentes

**Archivo:** `src/app/pages/landin-page/landin-page.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
// ... otros imports

@Component({
  selector: 'app-landin-page',
  standalone: true,
  imports: [
    // ... imports existentes
  ],
  templateUrl: './landin-page.component.html',
  styleUrl: './landin-page.component.scss'
})
export class LandinPageComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'A&V Traditions - Comercio Internacional de Productos Colombianos',
      description: 'Comercio global con confianza local. Exportamos productos agrícolas colombianos de alta calidad. Azúcar, café, frutas tropicales y más.',
      keywords: 'exportación colombia, productos agrícolas, comercio internacional, azúcar, café, frutas tropicales',
      url: 'https://tudominio.com',
      image: 'https://tudominio.com/logo-with-name.png'
    });
  }
}
```

#### Paso 5: Agregar alt text a todas las imágenes

**Archivo:** `src/app/shared/nav-bar/nav-bar.component.html`

```html
<!-- ANTES -->
<img src="logo-navbar.png" alt="vox-umbrae" height="50">

<!-- DESPUÉS -->
<img src="logo-navbar.png" alt="A&V Traditions - Logo de comercio internacional" height="50">
```

**Archivo:** `src/app/sections/footer/footer.component.html`

```html
<!-- ANTES -->
<img src="logo-navbar.png" alt="A&V Traditions" width="40" class="me-3">

<!-- DESPUÉS -->
<img src="logo-navbar.png" alt="A&V Traditions - Exportadores de productos colombianos" width="40" class="me-3">
```

---

### 🎯 FASE 2: Google Analytics

#### Paso 6: Instalar Google Analytics

**1. Crear cuenta en Google Analytics:**
- Ve a https://analytics.google.com
- Crea una propiedad
- Obtén tu Measurement ID (formato: G-XXXXXXXXXX)

**2. Agregar el código:**

**Archivo:** `src/index.html` (antes del `</head>`)

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TU_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TU_MEASUREMENT_ID');
</script>
```

#### Paso 7: Crear servicio de Analytics

**Crear archivo:** `src/app/services/analytics.service.ts`

```typescript
import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  // Evento de página vista
  trackPageView(url: string, title: string) {
    gtag('config', 'G-TU_MEASUREMENT_ID', {
      page_path: url,
      page_title: title
    });
  }

  // Eventos personalizados
  trackEvent(action: string, category: string, label?: string, value?: number) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }

  // Eventos específicos del negocio
  trackProductView(productName: string) {
    this.trackEvent('view_product', 'Products', productName);
  }

  trackContactClick() {
    this.trackEvent('click', 'Contact', 'contact_button');
  }

  trackPortfolioView(section: string) {
    this.trackEvent('view', 'Portfolio', section);
  }
}
```

#### Paso 8: Implementar tracking en componentes

**Archivo:** `src/app/pages/landin-page/landin-page.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';
// ... otros imports

@Component({
  // ... configuración existente
})
export class LandinPageComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    // SEO existente...
    this.seoService.updateMetaTags({...});
    
    // NUEVO: Analytics
    this.analytics.trackPageView('/', 'Página Principal - A&V Traditions');
  }
}
```

---

### 🎯 FASE 3: Archivos SEO Esenciales

#### Paso 9: Crear robots.txt

**Crear archivo:** `public/robots.txt`

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://tudominio.com/sitemap.xml

# Páginas que no queremos indexar
Disallow: /admin/
Disallow: /private/
```

#### Paso 10: Crear sitemap.xml

**Crear archivo:** `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tudominio.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tudominio.com/portafolio</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tudominio.com/portafolio/procesados</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tudominio.com/portafolio/no-procesados</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

#### Paso 11: Agregar Schema markup (JSON-LD)

**Archivo:** `src/index.html` (antes del `</head>`)

```html
<!-- Schema.org para mejor SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "A&V Traditions",
  "description": "Empresa de comercio internacional especializada en exportación de productos agrícolas colombianos",
  "url": "https://tudominio.com",
  "logo": "https://tudominio.com/logo-with-name.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+57-XXX-XXXXXXX",
    "contactType": "customer service",
    "availableLanguage": ["Spanish", "English"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CO",
    "addressLocality": "Tu Ciudad"
  },
  "sameAs": [
    "https://www.linkedin.com/company/av-traditions",
    "https://www.facebook.com/avtraditions",
    "https://www.instagram.com/avtraditions"
  ]
}
</script>
```

---

### 🎯 FASE 4: Performance Optimizations

#### Paso 12: Implementar Lazy Loading de imágenes

**Instalar dependencia:**
```bash
npm install @angular/common
```

**Crear directiva de lazy loading:**

**Crear archivo:** `src/app/directives/lazy-load.directive.ts`

```typescript
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit {
  @Input() appLazyLoad!: string;
  @Input() placeholder: string = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="%23f0f0f0"/></svg>';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setPlaceholder();
    this.observeImage();
  }

  private setPlaceholder() {
    this.el.nativeElement.src = this.placeholder;
  }

  private observeImage() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          observer.unobserve(this.el.nativeElement);
        }
      });
    });
    
    observer.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.el.nativeElement.src = this.appLazyLoad;
  }
}
```

**Usar la directiva:**

```html
<!-- ANTES -->
<img src="coffee-beans.jpg" alt="Café en grano">

<!-- DESPUÉS -->
<img appLazyLoad="coffee-beans.jpg" alt="Café en grano colombiano de exportación" loading="lazy">
```

#### Paso 13: Optimizar angular.json para production

**Archivo:** `angular.json`

```json
"production": {
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kB",
      "maximumError": "1MB"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kB",
      "maximumError": "4kB"
    }
  ],
  "outputHashing": "all",
  "optimization": true,
  "sourceMap": false,
  "extractCss": true,
  "namedChunks": false,
  "extractLicenses": true,
  "vendorChunk": false,
  "buildOptimizer": true
}
```

---

### 🎯 FASE 5: Angular Universal (SSR)

#### Paso 14: Instalar Angular Universal

```bash
ng add @nguniversal/express-engine
```

Este comando automáticamente:
- Instala las dependencias necesarias
- Configura el servidor Express
- Actualiza angular.json con comandos SSR
- Crea archivos de configuración

#### Paso 15: Configurar para SEO

**Archivo:** `src/app/app.config.ts`

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule)
  ]
};
```

#### Paso 16: Build y deploy con SSR

```bash
# Build para SSR
npm run build:ssr

# Ejecutar servidor SSR localmente
npm run serve:ssr
```

---

## Verificación y Testing

### 🔍 Verificar SEO

**1. Google Search Console:**
- Ve a https://search.google.com/search-console
- Agrega tu dominio
- Envía tu sitemap: `https://tudominio.com/sitemap.xml`

**2. Herramientas de testing:**
- **Lighthouse:** Auditoría completa (DevTools > Lighthouse)
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Rich Results Test:** https://search.google.com/test/rich-results

**3. Meta tags preview:**
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator

### 📊 Verificar Analytics

**1. Real-time en Google Analytics:**
- Ve a tu cuenta de Analytics
- Sección "Tiempo real"
- Navega por tu sitio y verifica que se registren las vistas

**2. Test de eventos:**
```javascript
// En console del navegador
gtag('event', 'test', {
  event_category: 'Testing',
  event_label: 'Manual test'
});
```

### ⚡ Verificar Performance

**1. Core Web Vitals:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

**2. Herramientas recomendadas:**
- Chrome DevTools > Performance
- WebPageTest.org
- GTmetrix.com

---

## Aplicar en Proyectos Futuros

### 📋 Checklist para Nuevos Proyectos

**Archivo:** `seo-checklist.md`

```markdown
## SEO Checklist para Proyectos Angular

### Configuración Inicial
- [ ] Cambiar idioma a `lang="es"` en index.html
- [ ] Copiar servicio SeoService
- [ ] Copiar servicio AnalyticsService
- [ ] Copiar directiva LazyLoadDirective

### Meta Tags
- [ ] Título único por página (max 60 caracteres)
- [ ] Meta description (max 155 caracteres)
- [ ] Keywords relevantes
- [ ] Open Graph tags
- [ ] Twitter Cards

### Archivos Obligatorios
- [ ] robots.txt en public/
- [ ] sitemap.xml en public/
- [ ] Schema markup JSON-LD

### Analytics
- [ ] Crear cuenta Google Analytics
- [ ] Configurar Measurement ID
- [ ] Implementar eventos personalizados

### Performance
- [ ] Lazy loading en imágenes
- [ ] Optimización de build
- [ ] Angular Universal (SSR)

### Testing Final
- [ ] Lighthouse score > 90
- [ ] Search Console configurado
- [ ] Analytics funcionando
- [ ] Meta tags preview OK
```

### 🔄 Automatización

**Crear script:** `scripts/seo-setup.sh`

```bash
#!/bin/bash

echo "🚀 Configurando SEO para nuevo proyecto..."

# Crear servicios
mkdir -p src/app/services
cp templates/seo.service.ts src/app/services/
cp templates/analytics.service.ts src/app/services/

# Crear directivas
mkdir -p src/app/directives
cp templates/lazy-load.directive.ts src/app/directives/

# Crear archivos SEO
cp templates/robots.txt public/
cp templates/sitemap.xml public/

echo "✅ SEO base configurado. Recuerda:"
echo "1. Actualizar Measurement ID en Analytics"
echo "2. Personalizar meta tags"
echo "3. Actualizar URLs en sitemap.xml"
```

### 📚 Recursos Adicionales

**Enlaces útiles para mantener actualizado:**

- **Angular SEO:** https://angular.io/guide/universal
- **Google Analytics 4:** https://support.google.com/analytics
- **Core Web Vitals:** https://web.dev/vitals/
- **Schema.org:** https://schema.org/docs/schemas.html
- **Open Graph:** https://ogp.me/

---

## Notas Importantes

### ⚠️ Consideraciones de Seguridad
- Nunca expongas claves API en el código frontend
- Usa variables de entorno para configuraciones sensibles
- Configura HTTPS antes de ir a producción

### 🔄 Mantenimiento Regular
- Actualizar sitemap.xml mensualmente
- Revisar métricas de Analytics semanalmente
- Auditorías de Lighthouse trimestralmente
- Actualizar Schema markup cuando cambies servicios

### 📈 Métricas Clave a Monitorear
- **Tráfico orgánico:** Crecimiento mes a mes
- **Páginas más visitadas:** Optimizar contenido popular
- **Tiempo en página:** Indica calidad del contenido
- **Tasa de rebote:** Meta < 40% para sitios comerciales
- **Conversiones:** Desde contacto hasta venta

**¡Con esta guía tienes todo lo necesario para un sitio web completamente optimizado!**

Implementa fase por fase y verifica cada paso antes de continuar.

---

## 📖 **Documentación Adicional**

- **[USO_DIARIO_SEO.md](USO_DIARIO_SEO.md)** - Guía práctica de cómo usar SEO y Analytics en nuevos componentes (día a día)
- **[VERIFICACION_SEO.md](VERIFICACION_SEO.md)** - Cómo verificar que todo funcione correctamente
