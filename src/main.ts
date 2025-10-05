import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // bootstrap exitoso — aquí podrías inicializar monitoreo, analytics, o registrar service worker
  })
  .catch((err) => {
    // Mejor mensaje para depuración y posibilidad de integrar remote logging
    console.error('Error bootstrapping Angular application:', err);
  });
