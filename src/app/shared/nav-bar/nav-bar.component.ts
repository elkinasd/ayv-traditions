import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterModule, ActivatedRoute  } from '@angular/router';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
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
