import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unprocessed-products',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './unprocessed-products.component.html',
  styleUrl: './unprocessed-products.component.scss'
})
export class UnprocessedProductsComponent {

    unprocessedProducts: { image: string, title: string, description: string }[] = [
  {
    image: 'fresh-fruits.jpg',
    title: `Frutas frescas`,
    description: `Mangos, bananos, fresas y otras frutas tropicales exportadas en estado fresco, reconocidas por su calidad y sabor natural.`
  },
  {
    image: 'coffee-beans.jpg',
    title: `Café en grano`,
    description: `Café verde en grano de origen colombiano, ideal para tostadores y distribuidores que buscan calidad de exportación.`
  },
  {
    image: 'cocoa-beans.jpg',
    title: `Cacao en grano`,
    description: `Cacao en grano sin procesar, base para la industria chocolatera mundial por su aroma y propiedades únicas.`
  },
  {
    image: 'grains.jpg',
    title: `Granos y cereales`,
    description: `Arroz, maíz, fríjol y otras materias primas agrícolas en su estado natural, destinadas a la industria y al consumo directo.`
  },
  {
    image: 'nuts.jpg',
    title: `Frutos secos y semillas`,
    description: `Nueces, maní, sésamo y otras semillas exportadas sin procesamiento, conservando sus propiedades nutritivas.`
  }
]


}
