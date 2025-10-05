import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  
  selectedService: any = null;

  services = [
    {
      icon: 'directions_boat',
      bgClass: 'bg-light-navy',
      title: 'Exportación',
      key: 'export', // 👈 clave para identificar el modal
      description: `Comercio de productos agrícolas, productos alimenticios y 
      materias primas con alcance global y experiencia local.`,
    },
    {
      icon: 'handshake',
      bgClass: 'bg-green',
      title: 'Broker',
      key: 'broker', // 👈 clave para identificar el modal
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
}
