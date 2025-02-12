import { Component, inject } from '@angular/core';
import { Incidencias } from '../../model/incidencias';
import { IncidenciasService } from '../../services/incidencias.service';
import { IncidenciasComponent } from "../incidencias/incidencias.component";
import { NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-ver-incidencias',
  imports: [IncidenciasComponent, NgFor, NgIf, NgStyle],
  templateUrl: './ver-incidencias.component.html',
  styleUrl: './ver-incidencias.component.css'
})
export class VerIncidenciasComponent {

  incidenciasList: Incidencias[] = [];
  incidenciasService: IncidenciasService = inject(IncidenciasService);
  filteredIncidenciasList: Incidencias[] = [];
  incidenciaSeleccionada: Incidencias | null = null;

  constructor() {
    this.incidenciasService.getAllIncidencias().then((incidenciasList: Incidencias[]) => {
      this.incidenciasList = incidenciasList;
      this.filteredIncidenciasList = incidenciasList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredIncidenciasList = this.incidenciasList.filter((incid) => incid?.categoria.toLowerCase().includes(text.toLowerCase()));
      return;
    }

    this.filteredIncidenciasList = this.incidenciasList.filter((incid) =>
      incid?.categoria.toLowerCase().includes(text.toLowerCase()),
    );


    /* this.productsService.getAllProducts().then((productsList: Products[]) => {
      this.productsList = productsList;
      this.filteredProductsList = productsList;
    }); */

  }

  selectIncidencia(incidencia: Incidencias) {
    console.log('Incidencia seleccionada llega');

    this.incidenciaSeleccionada = incidencia;
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
