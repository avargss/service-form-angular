import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incidencias } from '../../model/incidencias';
import { RouterModule } from '@angular/router';
import { IncidenciasService } from '../../services/incidencias.service';

@Component({
  selector: 'app-incidencias',
  imports: [CommonModule, RouterModule],
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.css'
})
export class IncidenciasComponent {

  @Input() filteredIncidenciasList: Incidencias[] = [];
  @Output() incidenciaSeleccionada = new EventEmitter<Incidencias>();

  incidenciasList: Incidencias[] = [];
  incidenciasService: IncidenciasService = inject(IncidenciasService);

  constructor() {
    // Se suscribe al observable de incidenciasService para obtener las incidencias
    this.incidenciasService.getAllIncidencias().subscribe(
      (incidenciasList) => {
        this.incidenciasList = incidenciasList;
        this.filteredIncidenciasList = incidenciasList;
      },
      (error) => {
        console.error('Error al obtener las incidencias:', error);
      }
    );
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredIncidenciasList = this.incidenciasList.filter((incid) => incid?.categoria.toLowerCase().includes(text.toLowerCase()));
      return;
    }

    this.filteredIncidenciasList = this.incidenciasList.filter((indic) =>
      indic?.categoria.toLowerCase().includes(text.toLowerCase()),
    ).reverse();

  }

  selectIncidencia(incidencia: Incidencias) {
    this.incidenciaSeleccionada.emit(incidencia);
  }

  borrarIncidencia(id: string) {
    // Se le pasa la id al service como String para que no de error de rutas y pueda borrar
    this.incidenciasService.borrarIncidencia(id).subscribe(
      (response) => {
        console.log('Incidencia borrada correctamente:', response);
        this.incidenciasList = this.incidenciasList.filter((incid) => incid.id !== id);
        this.filteredIncidenciasList = this.filteredIncidenciasList.filter((incid) => incid.id !== id);
      },
      (error) => {
        console.error('Error al borrar la incidencia:', error);
      });
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

}
