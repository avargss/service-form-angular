import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidenciasComponent } from "../incidencias/incidencias.component";
import { Incidencias } from '../../model/incidencias';
import { IncidenciasService } from '../../services/incidencias.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}