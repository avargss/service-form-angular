import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Empleados } from '../../model/personas';
import { DatosService } from '../../services/datos.service';
import { IncidenciasService } from '../../services/incidencias.service';
import { Incidencias } from '../../model/incidencias';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class Formulario implements OnInit {
  empleados: Empleados[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private datosService: DatosService, private incidenciasService: IncidenciasService) {

    this.form = this.fb.group({
      empleado: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaIncidencia: ['', [Validators.required, this.fechaMayorQueHoy]],
    });
  }

  fechaMayorQueHoy(control: AbstractControl): ValidationErrors | null {
    const fecha = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Con esto hago que no pille la hora, solo fecha
    return fecha < hoy ? { fechaAnterior: true } : null;
  }

  ngOnInit(): void {
    this.datosService.getAllEmpleados().subscribe(
      (empleados) => {
        this.empleados = empleados;
      },
      (error) => {
        console.error('Error al obtener los empleados:', error);
      }
    )
  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.valid) {
      const nuevaIncidencia: Incidencias = {
        ...this.form.value,
        createdAt: new Date()
      };

      this.incidenciasService.guardarIncidencia(nuevaIncidencia).subscribe(
        (response) => {
          console.log('Incidencia guardada:', response);
          this.form.reset();
        },
        (error) => {
          console.error('Error al guardar la incidencia:', error);
        }
      );
    }
  }

}