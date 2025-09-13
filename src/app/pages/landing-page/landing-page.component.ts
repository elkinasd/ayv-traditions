import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero.component';
import { ServicesComponent } from '../../sections/services/services.component';
import { WhyUsComponent } from '../../sections/why-us/why-us.component';
import { AboutComponent } from '../../sections/about/about.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { FooterComponent } from '../../sections/footer/footer.component';

import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../shared/scroll-to-top/scroll-to-top.component';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-landin-page',
  standalone: true,
  imports: [
    NavBarComponent,
    HeroComponent,
    ServicesComponent,
    WhyUsComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    ScrollToTopComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    this.seoService.setHomePageSEO();
  }
}
