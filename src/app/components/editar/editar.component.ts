import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncidenciasService } from '../../services/incidencias.service';
import { Incidencias } from '../../model/incidencias';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  form: FormGroup;
  incidencia: Incidencias | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private incidenciasService: IncidenciasService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaIncidencia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Pillo la id desde la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadIncidencia(id);
    }
  }

  loadIncidencia(id: string): void {

    this.incidenciasService.getIncidenciaById(id).subscribe(
      (incidencia) => {
        this.incidencia = incidencia;
        this.form.patchValue(incidencia);
      },
      (error) => {
        console.error('Error al cargar la incidencia:', error);
      }
    );
  }

  submit(): void {

    this.router.navigate(['/incidentes']);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.incidencia) {
      const updatedIncidencia = { ...this.incidencia, ...this.form.value };
      this.incidenciasService.editarIncidencia(updatedIncidencia).subscribe(
        (response) => {
          console.log('Incidencia actualizada:', response);
        },
        (error) => {
          console.error('Error al actualizar la incidencia:', error);
        }
      );
    }
  }
}