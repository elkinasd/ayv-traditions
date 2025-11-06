import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnDestroy {
  @ViewChild('exportModal') exportModal?: ElementRef<HTMLDivElement>;
  @ViewChild('brokerModal') brokerModal?: ElementRef<HTMLDivElement>;

  ngOnDestroy(): void { this.dismissModals(); }

  @HostListener('window:popstate')
  onBrowserBack(): void { this.dismissModals(); }
  
  selectedService: any = null;

  services = [
    {
      icon: 'directions_boat',
      bgClass: 'bg-light-navy',
      title: 'Exportación',
      key: 'export', 
      description: `Comercio de productos agrícolas, productos alimenticios y 
      materias primas con alcance global y experiencia local.`,
    },
    {
      icon: 'handshake',
      bgClass: 'bg-green',
      title: 'Broker',
      key: 'broker', 
      description: `Conectamos compradores y proveedores de manera eficiente, 
      facilitando la negociación y asegurando transacciones exitosas. 
      Nuestro objetivo es simplificar el proceso y generar valor para ambas partes.`,
    }
  ];

  openModal(service: any) {
    this.selectedService = service;
    const modalId = service.key === 'export' ? '#exportModal' : '#brokerModal';
    const modalElement = document.querySelector(modalId);
    if (modalElement) {
      // @ts-ignore
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  private dismissModals(): void {
    this.hideBootstrapModal(this.exportModal);
    this.hideBootstrapModal(this.brokerModal);
  }

  private hideBootstrapModal(modalRef?: ElementRef<HTMLDivElement>): void {
    const element = modalRef?.nativeElement;
    if (!element || typeof window === 'undefined') {
      return;
    }
    const modalCtor = (window as any).bootstrap?.Modal;
    if (!modalCtor) {
      return;
    }
    const instance = typeof modalCtor.getInstance === 'function' ? modalCtor.getInstance(element) : null;
    (instance ?? new modalCtor(element)).hide();
  }
}
