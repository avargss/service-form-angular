import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Carrito producto',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login page',
    }
];

export default routes;
