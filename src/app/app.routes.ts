import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrearIncidenciaComponent } from './components/crear-incidencia/crear-incidencia.component';
import { VerIncidenciasComponent } from './components/ver-incidencias/ver-incidencias.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'registrar-incidencia',
        component: CrearIncidenciaComponent,
        title: 'Crear incidencia',
    },
    {
        path: 'incidentes',
        component: VerIncidenciasComponent,
        title: 'Ver incidentes',
    },
];

export default routes;