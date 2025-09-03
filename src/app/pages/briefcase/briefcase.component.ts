import { Component, inject, Inject, OnInit } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';


import { FooterComponent } from '../../sections/footer/footer.component';
import { ScrollToTopComponent } from '../../shared/scroll-to-top/scroll-to-top.component';
import { NavbarBriefcaseComponent } from "../../shared/navbar-briefcase/navbar-briefcase.component";
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-briefcase',
  standalone: true,
  imports: [FooterComponent, ScrollToTopComponent, NavbarBriefcaseComponent, RouterOutlet],
  templateUrl: './briefcase.component.html',
  styleUrl: './briefcase.component.scss'
})
export class BriefcaseComponent implements OnInit {

  route = inject(Router);

  constructor(
    private seoService: SeoService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    // SEO para página en construcción
    this.seoService.setUnderConstructionSEO();

    // Analytics tracking
    this.analytics.trackUnderConstructionPage();
  }
}
