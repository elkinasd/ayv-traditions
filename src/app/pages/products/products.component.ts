import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';

import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private seoService = inject(SeoService);
  private analytics = inject(AnalyticsService);

  route = inject(Router);

  goToProcessedProducts() {
    this.route.navigate(['/products/processed-products']);
  }
  goToUnprocessedProducts() {
    this.route.navigate(['/products/unprocessed-products']);
  }


}
