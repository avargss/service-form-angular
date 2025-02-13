import { Component, inject } from '@angular/core';
import { Incidencias } from '../../model/incidencias';
import { IncidenciasService } from '../../services/incidencias.service';
import { IncidenciasComponent } from "../incidencias/incidencias.component";
import { DatePipe, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-ver-incidencias',
  imports: [IncidenciasComponent, NgIf, NgStyle, DatePipe],
  templateUrl: './ver-incidencias.component.html',
  styleUrls: ['./ver-incidencias.component.css']
})
export class VerIncidenciasComponent {

  incidenciasList: Incidencias[] = [];
  incidenciasService: IncidenciasService = inject(IncidenciasService);
  filteredIncidenciasList: Incidencias[] = [];
  incidenciaSeleccionada: Incidencias | null = null;
  categorias: string[] = [];
  logCount: number = 0;
  warnCount: number = 0;
  errorCount: number = 0;

  constructor() {
    // Se suscribe al observable de incidenciasService para obtener las incidencias
    this.incidenciasService.getAllIncidencias().subscribe(
      (incidenciasList) => {
        this.incidenciasList = incidenciasList;
        this.filteredIncidenciasList = incidenciasList;
        this.updateCounts();
      },
      (error) => {
        console.error('Error al obtener las incidencias:', error);
      }
    );
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredIncidenciasList = this.incidenciasList;
      this.updateCounts();
      return;
    }

    this.filteredIncidenciasList = this.incidenciasList.filter((incid) =>
      incid?.categoria.toLowerCase().includes(text.toLowerCase())
    );
    this.updateCounts();
  }

  selectIncidencia(incidencia: Incidencias) {
    this.incidenciaSeleccionada = incidencia;
    console.log('Incidencia seleccionadad llega', this.incidenciaSeleccionada);
  }

  closeIncidencia() {
    this.incidenciaSeleccionada = null;
  }

  getBackgroundColor(categoria: string): string {
    switch (categoria) {
      case 'Log':
        return 'rgba(88, 200, 210, 0.548)';
      case 'Warn':
        return 'rgba(253, 236, 128, 0.475)';
      case 'Error':
        return 'rgba(255, 133, 133, 0.552)';
      default:
        return 'white';
    }
  }

  updateCounts() {
    this.logCount = this.filteredIncidenciasList.filter(incidencia => incidencia.categoria === 'Log').length;
    this.warnCount = this.filteredIncidenciasList.filter(incidencia => incidencia.categoria === 'Warn').length;
    this.errorCount = this.filteredIncidenciasList.filter(incidencia => incidencia.categoria === 'Error').length;
  }

}
