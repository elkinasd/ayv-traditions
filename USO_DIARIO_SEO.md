# Cómo Usar SEO y Analytics en Nuevos Componentes

## 🎯 **Guía Práctica para el Día a Día**

Esta guía te explica **exactamente** cómo agregar SEO y Analytics a cualquier componente nuevo que crees.

---

## 🚀 **Para Páginas que YA tienen métodos listos**

Ya tienes estos métodos pre-configurados:

```typescript
// Métodos que ya están listos para usar:
this.seoService.setHomePageSEO()              // Página principal
this.seoService.setBriefcaseSEO()             // Portafolio  
this.seoService.setProcessedProductsSEO()     // Productos procesados
this.seoService.setUnprocessedProductsSEO()   // Productos sin procesar
this.seoService.setUnderConstructionSEO()     // En construcción
```

### **Ejemplo: Usar en un componente existente**

```typescript
// cualquier-componente.component.ts
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-cualquier-componente',
  // ... resto de la configuración
})
export class CualquierComponente implements OnInit {

  constructor(
    private seoService: SeoService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    // ¡SOLO 2 LÍNEAS! ✨
    this.seoService.setHomePageSEO();  // ← Método pre-configurado
    this.analytics.trackHomePage();    // ← Analytics automático
  }
}
```

---

## 🆕 **Para Páginas NUEVAS (Paso a Paso)**

### **Paso 1: Agregar método al SEO Service**

**Archivo:** `src/app/services/seo.service.ts`

```typescript
// Al final de la clase SeoService, agregar:

setContactSEO() {
  this.updateMetaTags({
    title: 'Contacto - A&V Traditions',
    description: 'Ponte en contacto con nosotros para exportar productos colombianos. Email, teléfono y oficinas.',
    keywords: 'contacto, exportación colombia, comercio internacional',
    url: `${environment.seo.baseUrl}/contacto`,
    image: environment.seo.defaultImage
  });
}

setServiciosSEO() {
  this.updateMetaTags({
    title: 'Servicios - A&V Traditions',
    description: 'Conoce nuestros servicios de exportación: logística, calidad, documentación y asesoría comercial.',
    keywords: 'servicios exportación, logística, comercio internacional',
    url: `${environment.seo.baseUrl}/servicios`,
    image: environment.seo.defaultImage
  });
}

setSobreNosotrosSEO() {
  this.updateMetaTags({
    title: 'Sobre Nosotros - A&V Traditions',
    description: 'Conoce la historia de A&V Traditions, empresa líder en exportación de productos agrícolas colombianos.',
    keywords: 'sobre nosotros, historia empresa, exportación colombia',
    url: `${environment.seo.baseUrl}/sobre-nosotros`,
    image: environment.seo.defaultImage
  });
}
```

### **Paso 2: Agregar método al Analytics Service**

**Archivo:** `src/app/services/analytics.service.ts`

```typescript
// Al final de la clase AnalyticsService, agregar:

trackContactPage() {
  this.trackPageView('/contacto', 'Página de Contacto - A&V Traditions');
}

trackServiciosPage() {
  this.trackPageView('/servicios', 'Servicios - A&V Traditions');
}

trackSobreNosotrosPage() {
  this.trackPageView('/sobre-nosotros', 'Sobre Nosotros - A&V Traditions');
}
```

### **Paso 3: Usar en el componente nuevo**

```typescript
// contacto.component.ts
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [], // tus imports aquí
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    // ¡Solo 2 líneas! ✨
    this.seoService.setContactSEO();     // ← SEO automático
    this.analytics.trackContactPage();   // ← Analytics automático
  }
}
```

---

## 📱 **Eventos Especiales (Botones, Formularios, etc.)**

### **Tracking de clicks en botones importantes:**

```typescript
// En cualquier componente
onContactButtonClick() {
  this.analytics.trackContactClick('button'); // 'button', 'email', 'phone'
  // ... resto de la lógica del botón
}

onProductClick(productName: string) {
  this.analytics.trackProductView(productName, 'processed'); // 'processed' o 'unprocessed'
  // ... resto de la lógica
}

onSocialMediaClick(platform: string) {
  this.analytics.trackSocialClick(platform); // 'linkedin', 'facebook', 'instagram'
  // ... abrir enlace social
}
```

### **En el HTML:**
```html
<!-- Ejemplo de botones con tracking -->
<button (click)="onContactButtonClick()" class="btn btn-primary">
  Contáctanos
</button>

<a (click)="onSocialMediaClick('linkedin')" href="https://linkedin.com/company/avtraditions">
  LinkedIn
</a>

<div (click)="onProductClick('Azúcar refinada')" class="product-card">
  <!-- contenido del producto -->
</div>
```

---

## 🎨 **Template Rápido para Nuevos Componentes**

### **Copia y pega este template:**

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-NOMBRE-COMPONENTE',
  standalone: true,
  imports: [],
  templateUrl: './NOMBRE-COMPONENTE.component.html',
  styleUrl: './NOMBRE-COMPONENTE.component.scss'
})
export class NombreComponenteComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    // TODO: Crear estos métodos en los servicios
    this.seoService.setTuNuevaPaginaSEO();
    this.analytics.trackTuNuevaPagina();
  }

  // Métodos para eventos especiales
  onImportantButtonClick() {
    this.analytics.trackEvent('click', 'Button', 'important_action');
    // tu lógica aquí
  }
}
```

---

## 🔄 **Workflow Completo para Nueva Página**

### **Checklist rápido:**

```
□ 1. Crear el componente Angular normal
□ 2. Agregar método SEO en seo.service.ts
□ 3. Agregar método Analytics en analytics.service.ts  
□ 4. Importar servicios en el componente
□ 5. Llamar métodos en ngOnInit()
□ 6. Agregar tracking a botones importantes (opcional)
□ 7. Testear que funcione en localhost
```

### **Tiempo estimado:**
- **Página existente:** 30 segundos ⚡
- **Página nueva:** 2 minutos 🚀

---

## 📊 **¿Qué vas a ver en Google Analytics?**

Una vez configurado, en Analytics vas a ver:

### **Páginas automáticamente trackeadas:**
- `/` - Página principal
- `/portafolio` - Portafolio  
- `/portafolio/procesados` - Productos procesados
- `/portafolio/no-procesados` - Productos sin procesar
- Y cualquier página nueva que agregues

### **Eventos automáticamente trackeados:**
- Clicks en botones de contacto
- Vistas de productos
- Clicks en redes sociales
- Errores de JavaScript
- Métricas de performance

### **Reportes disponibles:**
- **Tiempo real:** Quién está en tu sitio AHORA
- **Audiencia:** De dónde vienen tus visitantes
- **Adquisición:** ¿Google? ¿Facebook? ¿Directo?
- **Comportamiento:** ¿Qué páginas ven más?
- **Conversiones:** ¿Cuántos contactan?

---

## 🚨 **Troubleshooting**

### **"No veo datos en Analytics"**
```
1. Verificar que G-XXXXXXXXXX esté actualizado
2. Esperar 24-48 horas para datos históricos
3. Para tiempo real: desactivar bloqueadores de ads
4. Verificar en modo incógnito
```

### **"SEO tags no aparecen"**
```
1. Verificar que ngOnInit() se ejecute
2. Usar F12 > Elements > buscar meta tags
3. Testear con Facebook Debugger
```

### **"Eventos no se registran"**
```
1. Verificar que gtag esté cargado: console.log(typeof gtag)
2. Ver Console para errores de JavaScript
3. Testear eventos manuales en Console
```

---

## 🎯 **Próximos Pasos**

1. **Crear páginas básicas:** Contacto, Servicios, Sobre Nosotros
2. **Configurar Google Analytics** con tu ID real
3. **Agregar eventos específicos** de tu negocio
4. **Monitorear resultados** semanalmente

---

## 🎯 **RESUMEN SÚPER RÁPIDO**

### **Para la mayoría de casos (95%):**
```
1. Crear componente normal
2. Importar SEO y Analytics services
3. Agregar 2 líneas en ngOnInit()
4. ¡LISTO! 🎉
```

### **Para páginas totalmente nuevas (5%):**
```
1. Agregar método en seo.service.ts (1 vez)
2. Crear componente normal
3. Agregar 2 líneas en ngOnInit()
4. ¡LISTO! 🎉
```

### **¿Qué pasa automáticamente?**
- ✅ Google ve el título correcto
- ✅ Facebook/WhatsApp muestran preview bonito
- ✅ Analytics registra la visita
- ✅ SEO optimizado automáticamente
- ✅ Performance monitoreado

**¿Necesitás ayuda creando alguna página específica? ¡Solo decime cuál y te hago el código completo!**
