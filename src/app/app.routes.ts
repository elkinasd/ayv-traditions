import { Routes } from '@angular/router';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { WhyUsComponent } from './sections/why-us/why-us.component';
import { ContactComponent } from './sections/contact/contact.component';

export const routes: Routes = [

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
    }
];
