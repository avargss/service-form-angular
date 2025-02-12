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

  @Input() incidencia!: Incidencias;
  @Output() incidenciaSeleccionada = new EventEmitter<Incidencias>();

  incidenciasList: Incidencias[] = [];
  incidenciasService: IncidenciasService = inject(IncidenciasService);
  filteredIncidenciasList: Incidencias[] = [];

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

    this.filteredIncidenciasList = this.incidenciasList.filter((indic) =>
      indic?.categoria.toLowerCase().includes(text.toLowerCase()),
    );


    /* this.productsService.getAllProducts().then((productsList: Products[]) => {
      this.productsList = productsList;
      this.filteredProductsList = productsList;
    }); */

  }

  selectIncidencia() {
    console.log('Incidencia seleccionada', this.incidencia);

    this.incidenciaSeleccionada.emit(this.incidencia);
  }

  

}
