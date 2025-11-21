import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare let gtag: (...args: unknown[]) => void;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() { /* empty */ }

  // Configurar Analytics con el Measurement ID desde environment
  private measurementId = environment.analytics.googleAnalyticsId;
  private enableDebug = environment.analytics.enableDebug;

  // Evento de página vista
  trackPageView(url: string, title: string) {
    if (typeof gtag !== 'undefined') {
      gtag('config', this.measurementId, {
        page_path: url,
        page_title: title,
      });
    }
  }

  // Eventos personalizados generales
  trackEvent(action: string, category: string, label?: string, value?: number) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }

  // Eventos específicos del negocio
  trackProductView(productName: string, category: 'processed' | 'unprocessed') {
    this.trackEvent('view_product', 'Products', `${category}-${productName}`);
  }

  trackContactClick(method: 'email' | 'phone' | 'form') {
    this.trackEvent('contact_click', 'Contact', method);
  }

  trackPortfolioView(section: 'processed' | 'unprocessed' | 'main') {
    this.trackEvent('portfolio_view', 'Portfolio', section);
  }

  trackNavigationClick(destination: string) {
    this.trackEvent('navigation_click', 'Navigation', destination);
  }

  trackDownload(filename: string) {
    this.trackEvent('download', 'Files', filename);
  }

  trackSocialClick(platform: 'linkedin' | 'facebook' | 'instagram') {
    this.trackEvent('social_click', 'Social Media', platform);
  }

  trackExternalLink(url: string) {
    this.trackEvent('external_link', 'Outbound Links', url);
  }

  // Eventos de engagement
  trackScrollDepth(percentage: number) {
    this.trackEvent('scroll', 'Engagement', `${percentage}%`, percentage);
  }

  trackTimeOnPage(seconds: number) {
    this.trackEvent('time_on_page', 'Engagement', 'seconds', seconds);
  }

  // Eventos de conversión
  trackInquiry(productType?: string) {
    this.trackEvent('inquiry', 'Conversion', productType);
  }

  trackQuoteRequest(productCategory: string) {
    this.trackEvent('quote_request', 'Conversion', productCategory);
  }

  // Errores y debugging
  trackError(error: string, page: string) {
    this.trackEvent('error', 'Technical', `${page}-${error}`);
  }

  // Métodos específicos para páginas
  trackHomePage() {
    this.trackPageView('/', 'Página Principal - A&V Traditions');
  }

  trackBriefcasePage() {
    this.trackPageView('/portafolio', 'Portafolio - A&V Traditions');
    this.trackPortfolioView('main');
  }

  trackProcessedProductsPage() {
    this.trackPageView('/portafolio/procesados', 'Productos Procesados - A&V Traditions');
    this.trackPortfolioView('processed');
  }

  trackUnprocessedProductsPage() {
    this.trackPageView('/portafolio/no-procesados', 'Productos Sin Procesar - A&V Traditions');
    this.trackPortfolioView('unprocessed');
  }
}
