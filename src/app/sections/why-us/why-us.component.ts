import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss',
})
export class WhyUsComponent {
  services = [
    {
      icon: 'memory',
      title: 'Tecnología',
      color: '#004AAD',
      descripcion: `Usamos tecnología avanzada para optimizar toda la 
      cadena logística, garantizando trazabilidad, precisión y eficiencia 
      desde el origen hasta el destino final de cada operación.`,
    },
    {
      icon: 'support_agent',
      title: 'Servicio al cliente',
      color: '#28A745',
      descripcion: `Construimos relaciones sólidas basadas en confianza y 
      comunicación clara. Acompañamos a nuestros aliados con soporte personalizado 
      y asesoría en cada etapa del proceso.`,
    },
    {
      icon: 'work',
      title: 'Portafolio',
      color: '#FFC107',
      descripcion: `Ofrecemos productos agrícolas, alimentos procesados y minerales 
      de alta calidad. Nuestro portafolio diverso se adapta a cada mercado, generando 
      oportunidades reales de expansión.`,
    },
  ];
}
