import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {

  services = [
    {
      icon: 'memory',
      title: 'Tecnología',
      color: '#004AAD',
    },
    {
      icon: 'support_agent',
      title: 'Servicio al cliente',
      color: '#28A745',
    },
    {
      icon: 'work',
      title: 'Portafolio',
      color: '#FFC107',
    }
  ];

}
