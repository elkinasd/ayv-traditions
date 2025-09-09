import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from "../../contact/contact.component";

@Component({
  selector: 'app-processed-products',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  templateUrl: './processed-products.component.html',
  styleUrl: './processed-products.component.scss'
})
export class ProcessedProductsComponent {

  processedProducts: { image: string, title: string, description: string, }[] = [
    {
      image: 'sugar.jpg',
      title: `Azúcares y derivados`,
      description: `Incluye azúcar refinada, morena, panela y melazas con altos estándares de pureza para la industria alimenticia y bebidas.`
    },
    {
      image: 'fruits.jpg',
      title: `Frutas procesadas`,
      description: `Pulpa, jugos concentrados y frutas deshidratadas como mango, fresa y banano, listos para consumo o uso industrial.`
    },
    {
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
      title: `Café y cacao procesados`,
      description: `Café tostado, molido y soluble, además de cacao en polvo y chocolates, reconocidos por su aroma y calidad de origen.`
    },
    {
      image: 'beans.jpg',
      title: `Granos y cereales transformados`,
      description: `Harinas y derivados de maíz, arroz y otros cereales que aportan valor agregado a la panadería y alimentos balanceados.`
    },
    {
      image: 'tuberculos.webp',
      title: `Tubérculos`,
      description: `Actualmente contamos con yuca y papa empacados al vacío, productos frescos y de alta calidad listos para su comercialización.`
    }
  ]

}
