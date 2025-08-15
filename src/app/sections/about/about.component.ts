import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  services = [
    {
      icon: 'shield',
      title: 'Alcance global',
      color: '#f59e0b',
      bgColor: '#fef3c7'
    },
    {
      icon: 'check_circle',
      title: 'Calidad asegurada',
      color: '#10b981',
      bgColor: '#d1fae5'
    }
  ];
}
