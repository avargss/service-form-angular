import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incidencias } from '../model/incidencias';
import { HttpClient } from '@angular/common/http';
import { Empleados } from '../model/personas';

@Injectable({
    providedIn: 'root'
})

export class DatosService {

    private empleadosUrl = 'http://localhost:3000/empleados';
    private incidenciasUrl = 'http://localhost:3000/incidencias';

    private incidenciasSubject = new BehaviorSubject<Incidencias[]>([]);
    incidencias$: Observable<Incidencias[]> = this.incidenciasSubject.asObservable();

    http = inject(HttpClient);
    constructor() { }

    getAllEmpleados(): Observable<Empleados[]> {
        return this.http.get<Empleados[]>(this.empleadosUrl);
    }

    getAllIncidencias(): Observable<Incidencias[]> {
        return this.http.get<Incidencias[]>(this.incidenciasUrl);
    }

    /* async getAllEmpleados(): Promise<Empleados[]> {
        const data = await fetch(this.empleadosUrl);
        return (await data.json()) ?? [];
    }

    async getAllIncidencias(): Promise<Incidencias[]> {
        const data = await fetch(this.incidenciasUrl);
        return (await data.json()) ?? [];
    } */
}