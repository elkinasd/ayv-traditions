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
  
  services: { icon: string; bgClass: string; title: string; description: string; linkOne: string; linkTwo: string }[] = [
    {
      icon: 'directions_boat', 
      bgClass: 'bg-light-navy',
      title: 'Exportación',
      description: `Comercio de productos agrícolas, productos alimenticios y 
      materias primas con alcance global y experiencia local.`,
      linkOne: 'algo.com',
      linkTwo: 'algo.com',
    },
    {
      icon: 'handshake', 
      bgClass: 'bg-green',
      title: 'Broker',
      description: `Conectamos compradores y proveedores de manera eficiente, 
      facilitando la negociación y asegurando transacciones exitosas. 
      Nuestro objetivo es simplificar el proceso y generar valor para ambas partes.`,
      linkOne: 'algo.com',
      linkTwo: 'algo.com',
      
    }
  ];

}
