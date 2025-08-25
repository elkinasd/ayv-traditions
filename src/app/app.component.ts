import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandinPageComponent } from "./pages/landin-page/landin-page.component";
import { PerformanceService } from './services/performance.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandinPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ayv-traditions';

  constructor(private performance: PerformanceService) {}

  ngOnInit() {
    // El servicio se inicializa automáticamente y comienza a monitorear
    // También podemos trackear información de conexión
    this.performance.trackConnectionInfo();
  }
}
