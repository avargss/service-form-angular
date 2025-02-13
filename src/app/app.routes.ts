import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Formulario } from './components/formulario/formulario.component';
import { VerIncidenciasComponent } from './components/ver-incidencias/ver-incidencias.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'formulario',
        component: Formulario,
        title: 'Formulario',
    },
    {
        path: 'incidentes',
        component: VerIncidenciasComponent,
        title: 'Ver incidentes',
    },
];

export default routes;