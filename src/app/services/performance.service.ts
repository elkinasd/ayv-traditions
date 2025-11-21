import { Injectable, inject } from '@angular/core';
import { AnalyticsService } from './analytics.service';

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface NetworkInformation {
  effectiveType: string;
  downlink: number;
  rtt: number;
}

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private analytics = inject(AnalyticsService);

  constructor() {
    this.initPerformanceMonitoring();
  }

  private initPerformanceMonitoring() {
    if (typeof window === 'undefined') {
      return;
    }
    // Monitorear Core Web Vitals cuando sea posible
    this.observeWebVitals();

    // Monitorear tiempo de carga de página
    this.trackPageLoadTime();

    // Monitorear errores de JavaScript
    this.trackJavaScriptErrors();
  }

  private observeWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();

    // First Input Delay (FID)
    this.observeFID();

    // Cumulative Layout Shift (CLS)
    this.observeCLS();
  }

  private observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        // LCP debe ser < 2.5s para ser considerado bueno
        const lcpValue = lastEntry.startTime;
        this.analytics.trackEvent('web_vital', 'LCP', 'value', Math.round(lcpValue));

        if (lcpValue > 2500) {
          this.analytics.trackEvent('web_vital', 'LCP', 'poor');
        } else if (lcpValue > 1000) {
          this.analytics.trackEvent('web_vital', 'LCP', 'needs_improvement');
        } else {
          this.analytics.trackEvent('web_vital', 'LCP', 'good');
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch {
        // Silently fail if not supported
      }
    }
  }

  private observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          const performanceEntry = entry as PerformanceEventTiming;
          // FID debe ser < 100ms para ser considerado bueno
          const fidValue = performanceEntry.processingStart - performanceEntry.startTime;
          this.analytics.trackEvent('web_vital', 'FID', 'value', Math.round(fidValue));

          if (fidValue > 300) {
            this.analytics.trackEvent('web_vital', 'FID', 'poor');
          } else if (fidValue > 100) {
            this.analytics.trackEvent('web_vital', 'FID', 'needs_improvement');
          } else {
            this.analytics.trackEvent('web_vital', 'FID', 'good');
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['first-input'] });
      } catch {
        // Silently fail if not supported
      }
    }
  }

  private observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries: LayoutShift[] = [];

      const observer = new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          const layoutShift = entry as unknown as LayoutShift;
          // Solo contar layout shifts que no tuvieron input reciente
          if (!layoutShift.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            // Si el entry ocurrió menos de 1 segundo después del anterior entry
            // y menos de 5 segundos después del primer entry en la sesión,
            // incluirlo en la sesión actual
            if (
              sessionValue &&
              layoutShift.startTime - lastSessionEntry.startTime < 1000 &&
              layoutShift.startTime - firstSessionEntry.startTime < 5000
            ) {
              sessionValue += layoutShift.value;
              sessionEntries.push(layoutShift);
            } else {
              sessionValue = layoutShift.value;
              sessionEntries = [layoutShift];
            }

            // Si el valor actual de la sesión es mayor que el CLS más alto
            // visto hasta ahora, actualizar CLS y las entradas que contribuyeron
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
            }
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['layout-shift'] });

        // Reportar CLS cuando la página se va a descargar
        window.addEventListener('beforeunload', () => {
          // CLS debe ser < 0.1 para ser considerado bueno
          this.analytics.trackEvent(
            'web_vital',
            'CLS',
            'value',
            Math.round(clsValue * 1000) / 1000
          );

          if (clsValue > 0.25) {
            this.analytics.trackEvent('web_vital', 'CLS', 'poor');
          } else if (clsValue > 0.1) {
            this.analytics.trackEvent('web_vital', 'CLS', 'needs_improvement');
          } else {
            this.analytics.trackEvent('web_vital', 'CLS', 'good');
          }
        });
      } catch {
        // Silently fail if not supported
      }
    }
  }

  private trackPageLoadTime() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;

        if (perfData) {
          const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
          const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
          const serverTime = perfData.responseEnd - perfData.requestStart;
          const downloadTime = perfData.responseEnd - perfData.responseStart;
          const domTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;

          // Enviar métricas a Analytics
          this.analytics.trackEvent(
            'performance',
            'page_load_time',
            'total',
            Math.round(pageLoadTime)
          );
          this.analytics.trackEvent('performance', 'dns_time', 'total', Math.round(dnsTime));
          this.analytics.trackEvent('performance', 'server_time', 'total', Math.round(serverTime));
          this.analytics.trackEvent(
            'performance',
            'download_time',
            'total',
            Math.round(downloadTime)
          );
          this.analytics.trackEvent('performance', 'dom_time', 'total', Math.round(domTime));
        }
      }, 1000);
    });
  }

  private trackJavaScriptErrors() {
    window.addEventListener('error', event => {
      this.analytics.trackError(
        `${event.error?.name || 'Unknown'}: ${event.message}`,
        window.location.pathname
      );
    });

    window.addEventListener('unhandledrejection', event => {
      this.analytics.trackError(`Promise rejection: ${event.reason}`, window.location.pathname);
    });
  }

  // Métodos públicos para tracking manual
  trackResourceLoadTime(resourceName: string, loadTime: number) {
    this.analytics.trackEvent('performance', 'resource_load_time', resourceName, loadTime);
  }

  trackUserInteraction(interactionType: string, elementName: string, responseTime: number) {
    this.analytics.trackEvent('interaction', interactionType, elementName, responseTime);
  }

  // Métricas de conectividad
  trackConnectionInfo() {
    if (typeof window === 'undefined') {
      return;
    }
    if ('navigator' in window && 'connection' in navigator) {
      const connection = (navigator as unknown as { connection: NetworkInformation }).connection;
      if (connection) {
        this.analytics.trackEvent('connection', 'type', connection.effectiveType);
        this.analytics.trackEvent(
          'connection',
          'downlink',
          'mbps',
          Math.round(connection.downlink)
        );
        this.analytics.trackEvent('connection', 'rtt', 'ms', connection.rtt);
      }
    }
  }
}
