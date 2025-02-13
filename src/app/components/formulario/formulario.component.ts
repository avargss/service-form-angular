import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Empleados } from '../../model/personas';
import { DatosService } from '../../services/datos.service';
import { IncidenciasService } from '../../services/incidencias.service';
import { Incidencias } from '../../model/incidencias';
import { ObservableService } from '../../services/observable.service';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class Formulario implements OnInit {
  empleados: Empleados[] = [];
  form: FormGroup;
  nombreEmpleado: string = '';

  constructor(private fb: FormBuilder, private datosService: DatosService, private incidenciasService: IncidenciasService, private observableService: ObservableService) {

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

    const haceUnMes = new Date();
    haceUnMes.setMonth(haceUnMes.getMonth() - 1);
    haceUnMes.setHours(0, 0, 0, 0); // Lo mismo pero para el mes

    if (fecha < haceUnMes || fecha > hoy) {
      return { fechaInvalida: true };
    }

    return null
  }

  ngOnInit(): void {
    this.datosService.getAllEmpleados().subscribe(
      (empleados) => {
        this.empleados = empleados;
      },
      (error) => {
        console.error('Error al obtener los empleados:', error);
      }
    );

    if (typeof localStorage !== 'undefined') {
      const empleadoGuardado = localStorage.getItem('empleado');
      if (empleadoGuardado) {
        this.nombreEmpleado = empleadoGuardado;

        // Actualiza el valor del campo 'empleado' en el formulario con el valor almacenado en localStorage
        this.form.patchValue({ empleado: empleadoGuardado });
      }
    }

  }

  obtenerNombreEmpleado(): void {
    this.nombreEmpleado = this.form.value.empleado;
    localStorage.setItem('empleado', this.nombreEmpleado);
    this.observableService.setNombreDelTitulo(this.nombreEmpleado);
  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.valid) {
      // Mirar como guardar todos los datos como jn
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