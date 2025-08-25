import { Component, inject, Inject } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';


import { FooterComponent } from '../../sections/footer/footer.component';
import { ScrollToTopComponent } from '../../shared/scroll-to-top/scroll-to-top.component';
import { NavbarBriefcaseComponent } from "../../shared/navbar-briefcase/navbar-briefcase.component";
import { UnderConstructionComponent } from '../../sections/under-construction/under-construction.component';

@Component({
  selector: 'app-briefcase',
  standalone: true,
  imports: [FooterComponent, ScrollToTopComponent, NavbarBriefcaseComponent, UnderConstructionComponent],
  templateUrl: './briefcase.component.html',
  styleUrl: './briefcase.component.scss'
})
export class BriefcaseComponent {

  route = inject(Router);
}
