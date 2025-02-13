import { Injectable } from '@angular/core';
import { count } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  countLog = 0;
  countWarn = 0;
  countError = 0;

  constructor() {
  }

  log(msg: string) {
    console.log(msg);
    this.countLog++;
    this.showCounts();
  }

  warn(msg: string) {
    console.warn(msg);
    this.countWarn++;
    this.showCounts();
  }

  error(msg: string) {
    console.error(msg);
    this.countError++;
    this.showCounts();
  }

  showCounts() {
    console.log(this.countLog, this.countWarn, this.countError);
  }
}
