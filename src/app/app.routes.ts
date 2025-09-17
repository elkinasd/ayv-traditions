import { Routes } from '@angular/router';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { WhyUsComponent } from './sections/why-us/why-us.component';
import { ContactComponent } from './sections/contact/contact.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProcessedProductsComponent } from './pages/products/processed-products/processed-products.component';
import { UnprocessedProductsComponent } from './pages/products/unprocessed-products/unprocessed-products.component';
import { ProductsLayoutComponent } from './pages/products/products-layout/products-layout.component';


export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'services',
        component: ServicesComponent
    },
    {
        path: 'why-us',
        component: WhyUsComponent
    }
    ,
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'products',
        component: ProductsLayoutComponent, 
        children: [
            {
                path: '',
                component: ProductsComponent 
            },
            {
                path: 'processed-products',
                component: ProcessedProductsComponent
            },
            {
                path: 'unprocessed-products',
                component: UnprocessedProductsComponent
            },
            {
                path: '**',
                redirectTo: '',
                pathMatch: 'full'
            }
        ]
    }
    ,
    { path: '**', component: NotFoundComponent },

];
