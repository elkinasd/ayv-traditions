# Guía de Verificación SEO, Analytics y Performance

## ✅ Checklist de Verificación Rápida

### SEO Básico
- [ ] **Idioma:** Verificar que `<html lang="es">` en view-source del sitio
- [ ] **Título:** Debe aparecer "A&V Traditions - Comercio Internacional" en la pestaña del navegador
- [ ] **Meta Description:** Usar herramienta de inspección de Facebook/Twitter
- [ ] **Alt texts:** Inspeccionar imágenes y verificar que tengan descripciones

### Archivos SEO
- [ ] **Robots.txt:** Ir a `tudominio.com/robots.txt` - debe mostrar contenido
- [ ] **Sitemap:** Ir a `tudominio.com/sitemap.xml` - debe mostrar XML válido

### Analytics
- [ ] **Google Analytics:** Verificar en tiempo real que se registren visitas
- [ ] **Eventos:** Comprobar que se envíen eventos de navegación

### Performance
- [ ] **Core Web Vitals:** Usar Lighthouse en DevTools (score > 90)
- [ ] **Lazy Loading:** Verificar que imágenes se cargan bajo demanda

---

## 🔍 Herramientas de Verificación Detallada

### 1. SEO Tools Online

**Meta Tags Preview:**
```
Facebook Debugger: https://developers.facebook.com/tools/debug/
Twitter Card Validator: https://cards-dev.twitter.com/validator
LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
```

**SEO Analysis:**
```
Google PageSpeed Insights: https://pagespeed.web.dev/
GTmetrix: https://gtmetrix.com/
Lighthouse (Chrome DevTools): F12 > Lighthouse > Generate Report
```

**Rich Results Testing:**
```
Google Rich Results Test: https://search.google.com/test/rich-results
Schema Markup Validator: https://validator.schema.org/
```

### 2. Analytics Verification

**Real-time Analytics Check:**
1. Ir a Google Analytics (analytics.google.com)
2. Seleccionar tu propiedad
3. Ir a "Tiempo real" > "Resumen"
4. Navegar por tu sitio en otra pestaña
5. Verificar que aparezcan las visitas en tiempo real

**Event Tracking Check:**
```javascript
// Abrir Console en DevTools (F12) y ejecutar:
gtag('event', 'test_event', {
  event_category: 'Testing',
  event_label: 'Manual verification',
  value: 1
});
```

### 3. Performance Testing

**Core Web Vitals Check:**
1. Abrir Chrome DevTools (F12)
2. Ir a pestaña "Lighthouse"
3. Seleccionar "Performance"
4. Click "Generate report"
5. Verificar scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 95
   - SEO: > 95

**Network Performance:**
1. DevTools > Network tab
2. Refresh página
3. Verificar:
   - Total load time < 3s
   - First Contentful Paint < 1.5s
   - Images load progressively (lazy loading)

---

## 🚨 Problemas Comunes y Soluciones

### Analytics No Funciona
```
Problema: No se ven visitas en tiempo real
Solución:
1. Verificar que G-XXXXXXXXXX tenga tu ID real
2. Comprobar que no hay bloqueadores de ads
3. Usar modo incógnito para testear
4. Verificar en Console si hay errores de gtag
```

### SEO Tags No Aparecen
```
Problema: Facebook/Twitter no muestran preview
Solución:
1. Usar "Fetch new scrape information" en Facebook Debugger
2. Verificar que URLs sean completas (https://)
3. Comprobar que imágenes sean accesibles públicamente
```

### Performance Bajo
```
Problema: Lighthouse score < 80
Solución:
1. Verificar que imágenes usen lazy loading
2. Comprobar que no hay JavaScript bloqueante
3. Usar formato WebP para imágenes
4. Minimizar CSS/JS no usado
```

---

## 📊 Métricas a Monitorear

### SEO Monthly Review
- **Posición en Google:** Buscar "A&V Traditions"
- **Tráfico Orgánico:** Analytics > Adquisición > Todo el tráfico > Canales
- **Keywords Performance:** Google Search Console
- **Click-through Rate:** Search Console > Rendimiento

### Analytics Weekly Review
- **Páginas más visitadas:** Analytics > Comportamiento > Contenido del sitio
- **Tiempo en página:** Promedio > 2 minutos es bueno
- **Tasa de rebote:** < 60% es excelente
- **Dispositivos:** Mobile vs Desktop usage

### Performance Alerts
- **Page Load Time:** > 3s requiere optimización
- **Core Web Vitals:** Monitorear LCP, FID, CLS
- **Error Rate:** JavaScript errors < 1%
- **Bounce Rate:** Si aumenta > 70%, investigar

---

## 🔧 Comandos de Verificación Técnica

### Build Production
```bash
# Generar build optimizado
npm run build

# Verificar tamaño de archivos
ls -la dist/ayv-traditions/

# Servir build local para testing
npx http-server dist/ayv-traditions/
```

### SEO Testing Local
```bash
# Verificar robots.txt
curl http://localhost:4200/robots.txt

# Verificar sitemap
curl http://localhost:4200/sitemap.xml

# Verificar meta tags
curl -s http://localhost:4200 | grep -i "meta name\|meta property"
```

### Analytics Debug
```javascript
// En Console del navegador - verificar que gtag funciona
console.log(typeof gtag); // debe retornar "function"

// Verificar dataLayer
console.log(window.dataLayer); // debe mostrar array con datos

// Test event manual
gtag('event', 'page_view', {
  page_title: 'Test Page',
  page_location: window.location.href
});
```

---

## 📈 Next Steps After Verification

### 1. Submit to Search Engines
```
Google Search Console: https://search.google.com/search-console
- Add property: https://tudominio.com
- Verify ownership
- Submit sitemap: https://tudominio.com/sitemap.xml

Bing Webmaster Tools: https://www.bing.com/webmasters
- Add site
- Import from Google Search Console
```

### 2. Monitor Performance
```
Set up alerts in Analytics:
- Traffic drops > 20%
- Page load time > 3s
- Error rate > 5%

Weekly review schedule:
- Monday: Check weekend traffic
- Wednesday: Review performance metrics
- Friday: Analyze week's data trends
```

### 3. Content Optimization
```
Based on Analytics data:
- Identify top-performing pages
- Optimize low-traffic but important pages
- Create content for high-search-volume keywords
- Improve pages with high bounce rates
```

---

## 🎯 Success Metrics After 30 Days

### SEO Targets
- [ ] Google ranking for "A&V Traditions" in top 3
- [ ] Organic traffic increase > 25%
- [ ] Search Console impressions > 1000/month
- [ ] Click-through rate > 5%

### Performance Targets
- [ ] Lighthouse Performance score > 95
- [ ] Page load time < 2s
- [ ] Core Web Vitals all "Good"
- [ ] Zero console errors

### Analytics Targets
- [ ] Monthly visitors > 500
- [ ] Average session duration > 2 minutes
- [ ] Bounce rate < 50%
- [ ] Goal conversions set up and tracking

**¡Implementación SEO/Analytics/Performance Completada!** 🚀
