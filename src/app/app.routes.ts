import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    /* {
        path: 'comprar/:id',
        component: comprarComponent,
        title: 'Comprar producto',
    }, */
];

export default routes;
