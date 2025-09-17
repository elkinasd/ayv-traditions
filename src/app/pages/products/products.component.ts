import { Component, inject, Inject, OnInit } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';


import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  route = inject(Router);

  constructor(
    private seoService: SeoService,
    private analytics: AnalyticsService
  ) {}

  goToProcessedProducts(){
    this.route.navigate(['/products/processed-products']);
  }
  goToUnprocessedProducts(){
    this.route.navigate(['/products/unprocessed-products']);
  }

  ngOnInit() {
  }
}
