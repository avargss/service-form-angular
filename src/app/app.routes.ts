import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-producto/add-product.component';
import { VerProductosComponent } from './components/ver-productos/ver-productos.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'crear-producto',
        component: AddProductComponent,
        title: 'Añadir producto',
    },
    {
        path: 'ver-producto',
        component: VerProductosComponent,
        title: 'Ver productos',
    },
];

export default routes;