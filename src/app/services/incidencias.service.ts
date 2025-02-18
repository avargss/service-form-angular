import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incidencias } from '../model/incidencias';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private incidencia: Incidencias[] = [];

  incidenciasUrl = 'http://localhost:3000/incidencias';

  private incidenciasSubject = new BehaviorSubject<Incidencias[]>([]);
  incidencias$: Observable<Incidencias[]> = this.incidenciasSubject.asObservable();

  http = inject(HttpClient);
  constructor() { }

  // Esto es lo que se hace con HttpClient, tengo que trabajarlo usando observables y subscripciones
  getAllIncidencias(): Observable<Incidencias[]> {
    return this.http.get<Incidencias[]>(this.incidenciasUrl);
  }

  guardarIncidencia(incidencia: any): Observable<any> {
    return this.http.post(this.incidenciasUrl, incidencia);
  }

  editarIncidencia(incidencia: Incidencias): Observable<any> {
    return this.http.put(`${this.incidenciasUrl}/${incidencia.id}`, incidencia);
  }

  borrarIncidencia(id: string): Observable<any> {
    return this.http.delete(`${this.incidenciasUrl}/${id}`);
  }

  /* addIncidencia(nuevaIncidencia: Incidencias) {
    return this.http.post(this.incidenciasUrl, nuevaIncidencia);
  } */

  /* async getAllIncidencias(): Promise<Incidencias[]> {
    const data = await fetch(this.incidenciasUrl);
    return (await data.json()) ?? [];
  }

  async getIncidenciasById(id: number): Promise<Incidencias> {
    const data = await fetch(`${this.incidenciasUrl}/${id}`);
    return await data.json();
  } */
}