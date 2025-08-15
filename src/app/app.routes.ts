import { Routes } from '@angular/router';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { WhyUsComponent } from './sections/why-us/why-us.component';
import { ContactComponent } from './sections/contact/contact.component';
import { ProductsComponent } from './sections/services/products/products.component';
import { LandinPageComponent } from './pages/landin-page/landin-page.component';

export const routes: Routes = [

    {
        path: '',
        component: LandinPageComponent
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
        path: 'services/products',
        component: ProductsComponent
    }
];
