import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incidencias } from '../model/incidencias';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  incidenciasUrl = 'http://localhost:3000/incidencias';

  constructor(private http: HttpClient) { }

  async getAllIncidencias(): Promise<Incidencias[]> {
    const data = await fetch(this.incidenciasUrl);
    return (await data.json()) ?? [];
  }

  async getIncidenciasById(id: number): Promise<Incidencias> {
    const data = await fetch(`${this.incidenciasUrl}/${id}`);
    return await data.json();
  }

  // Esto es lo que se hace con HttpClient, tengo que trabajarlo usando observables y subscripciones
  /* getAllIncidencias() {
    return this.http.get<Incidencias[]>(this.incidenciasUrl);
  }

  addIncidencia(nuevaIncidencia: Incidencias) {
    return this.http.post(this.incidenciasUrl, nuevaIncidencia);
  } */
  
}