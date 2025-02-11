import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { BuyComponent } from './components/buy/buy.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'carrito',
        component: CartComponent,
        title: 'Carrito producto',
    },
    {
        path: 'crear',
        component: AddProductComponent,
        title: 'Añadir producto',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login page',
    },
     {
        path: 'comprar/:id',
        component: BuyComponent,
        title: ''
    }
];

export default routes;
