import { Component, inject, Inject, OnInit } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';


import { FooterComponent } from '../../../sections/footer/footer.component';
import { ScrollToTopComponent } from '../../../shared/scroll-to-top/scroll-to-top.component';
import { NavbarProductsComponent } from "../../../shared/navbar-products/navbar-products.component";
import { SeoService } from '../../../services/seo.service';
import { AnalyticsService } from '../../../services/analytics.service';

@Component({
  selector: 'app-products-layout',
  standalone: true,
  imports: [FooterComponent, ScrollToTopComponent, NavbarProductsComponent, RouterOutlet],
  templateUrl: './products-layout.component.html',
  styleUrl: './products-layout.component.scss'
})
export class ProductsLayoutComponent {

    route = inject(Router);
  
    constructor(
      private seoService: SeoService,
      private analytics: AnalyticsService
    ) {}
  
    ngOnInit() {
    }

}
