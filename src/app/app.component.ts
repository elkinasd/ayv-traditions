import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandinPageComponent } from "./pages/landin-page/landin-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandinPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ayv-traditions';
}
