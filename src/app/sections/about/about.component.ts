import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  services = [
    {
      icon: 'shield',
      title: 'Alcance global',
      color: '#f59e0b',
      bgColor: '#fef3c7',
      descripcion: `Nuestra red conecta productores colombianos con 
      mercados de todo el mundo, garantizando presencia en destinos 
      estratégicos. Facilitamos la internacionalización de productos 
      agrícolas, alimentos y minerales mediante procesos logísticos 
      eficientes, seguros y adaptados a cada mercado.`,
    },
    {
      icon: 'check_circle',
      title: 'Calidad asegurada',
      color: '#10b981',
      bgColor: '#d1fae5',
      descripcion: `Supervisamos cada etapa del proceso para que la 
      calidad se mantenga intacta desde el origen hasta el destino. 
      Trabajamos con productores confiables, aplicamos estándares internacionales 
      y combinamos tradición con tecnología para asegurar productos excepcionales 
      en cada entrega.`,
    },
  ];
}
