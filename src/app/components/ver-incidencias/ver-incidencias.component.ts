import { Component, inject } from '@angular/core';
import { Incidencias } from '../../model/incidencias';
import { IncidenciasService } from '../../services/incidencias.service';
import { IncidenciasComponent } from "../incidencias/incidencias.component";
import { NgIf, NgStyle } from '@angular/common';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-ver-incidencias',
  imports: [NgIf, NgStyle, IncidenciasComponent],
  templateUrl: './ver-incidencias.component.html',
  styleUrl: './ver-incidencias.component.css'
})
export class VerIncidenciasComponent {

  incidenciasList: Incidencias[] = [];
  incidenciasService: IncidenciasService = inject(IncidenciasService);
  filteredIncidenciasList: Incidencias[] = [];
  incidenciaSeleccionada: Incidencias | null = null;
  categorias: string[] = [];
  

  constructor(private logger: LoggerService) {
    this.incidenciasService.getAllIncidencias().then((incidenciasList: Incidencias[]) => {
      this.incidenciasList = incidenciasList;
      this.filteredIncidenciasList = incidenciasList;
      this
    });

    // Implementar contador de incidencias en el navbar. Tengo que investigar como hacerlo
    this.logger.log('Incidencias cargadas');

  }

  filterResults(text: string) {
    if (!text) {
      this.filteredIncidenciasList = this.incidenciasList;
      return;
    }

    this.filteredIncidenciasList = this.incidenciasList.filter((incid) =>
      incid?.categoria.toLowerCase().includes(text.toLowerCase()),
    );


    /* this.incidenciasService.getAllIncidencias().then((listaIncidencias: Incidencias[]) => {
      this.incidenciasList = listaIncidencias;
      this.filteredIncidenciasList = listaIncidencias;
    }); */

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

}
