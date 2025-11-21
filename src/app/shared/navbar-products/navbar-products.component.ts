import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

declare const bootstrap: typeof import('bootstrap');



@Component({
  selector: 'app-navbar-products',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-products.component.html',
  styleUrl: './navbar-products.component.scss',
})
export class NavbarProductsComponent {
  @ViewChild('offcanvasRef') offcanvasRef!: ElementRef;

  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  closeOffcanvas() {
    const offcanvas = bootstrap.Offcanvas.getInstance(this.offcanvasRef.nativeElement);
    if (offcanvas) {
      offcanvas.hide();
    }
  }

  navigateToSection(sectionId: string) {
    this.closeOffcanvas();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
