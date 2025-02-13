import { Injectable } from '@angular/core';
import { BehaviorSubject, count } from "rxjs";
import { IncidenciasService } from './incidencias.service';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  contLog: number = 0;
  contWarn: number = 0;
  contError: number = 0;

  constructor(private incidenciasService: IncidenciasService) {
    this.initValorContador();
  }

  contadorLog: number = 0;
  contadorWarn: number = 0;
  contadorError: number = 0;

  private countLog = new BehaviorSubject<number>(this.contadorLog);
  curLog$ = this.countLog.asObservable();

  private countWarn = new BehaviorSubject<number>(this.contadorWarn);
  curWarn$ = this.countWarn.asObservable();

  private countError = new BehaviorSubject<number>(this.contadorError);
  curError$ = this.countError.asObservable();

  private nombreDelTitulo = new BehaviorSubject<string>('');
  titulo$ = this.nombreDelTitulo.asObservable();

  private initValorContador() {
    this.incidenciasService.getAllIncidencias().subscribe(
      (incidencias) => {
        this.contadorLog = incidencias.filter(incidencia => incidencia.categoria == 'Log').length;
        this.contadorWarn = incidencias.filter(incidencia => incidencia.categoria == 'Warn').length;
        this.contadorError = incidencias.filter(incidencia => incidencia.categoria == 'Error').length;

        this.countLog.next(this.contadorLog);
        this.countWarn.next(this.contadorWarn);
        this.countError.next(this.contadorError);
      },
      (error) => {
        console.error('Error de initValorContador:', error);
      }
    );
  }

  setNombreDelTitulo(nombre: string) {
    this.nombreDelTitulo.next(nombre);
  }

  log(msg: string) {
    console.log(msg);
    this.countLog.next(this.countLog.value + 1);
    this.showCounts();
  }

  warn(msg: string) {
    console.warn(msg);
    this.countWarn.next(this.countWarn.value + 1);
    this.showCounts();
  }

  error(msg: string) {
    console.error(msg);
    this.countError.next(this.countError.value + 1);
    this.showCounts();
  }

  showCounts() {
    console.log(this.countLog, this.countWarn, this.countError);
  }
}
