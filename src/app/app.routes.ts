import { Routes } from '@angular/router';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { WhyUsComponent } from './sections/why-us/why-us.component';
import { ContactComponent } from './sections/contact/contact.component';
import { LandinPageComponent } from './pages/landin-page/landin-page.component';
import { BriefcaseComponent } from './pages/briefcase/briefcase.component';
import { ProcessedProductsComponent } from './sections/briefcase/processed-products/processed-products.component';
import { UnprocessedProductsComponent } from './sections/briefcase/unprocessed-products/unprocessed-products.component';


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
        path: 'briefcase',
        component: BriefcaseComponent,
        children: [
            {
                path: 'processed-products',
                component: ProcessedProductsComponent
            },
            {
                path: 'unprocessed-products',
                component: UnprocessedProductsComponent
            },
            {
                path: '',
                redirectTo: 'processed-products',
                pathMatch: 'full'
            }
        ]
    }
];
