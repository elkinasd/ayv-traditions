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
  
  services: { icon: string; bgClass: string; title: string; description: string; }[] = [
    {
      icon: 'local_shipping', 
      bgClass: 'bg-orange',
      title: 'Importación & Exportación',
      description: `Comercio de productos agrícolas, productos alimenticios y 
      materias primas con alcance global y experiencia local.`
    },
    {
      icon: 'directions_boat', 
      bgClass: 'bg-green',
      title: 'Asesorías',
      description: `Contamos con un personal altamente calificado para brindarte
      una asesoría de calidad y que tepermita lograr unna mejor toma de decisiones.`
    },
    {
      icon: 'support_agent', 
      bgClass: 'bg-grey',
      title: 'Asesorías',
      description: `Contamos con un personal altamente calificado para brindarte
      una asesoría de calidad y que tepermita lograr unna mejor toma de decisiones.`
    },
  ];

}
