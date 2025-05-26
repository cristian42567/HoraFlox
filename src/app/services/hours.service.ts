import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HourInterface } from '../interfaces/HourInterface';

@Injectable({
  providedIn: 'root'
})

export class HoursService {

  //BehaviorSubject para almacenar y emitir la lista de horas.
  private subjectHours: BehaviorSubject<HourInterface[]> = new BehaviorSubject<HourInterface[]>([]);

  //Observable expuesto para que los componentes se suscriban.
  observableHours: Observable<HourInterface[]> = this.subjectHours.asObservable();

  constructor(private hours: HttpClient) { }

  //Método get que recoge las horas del backend y actualiza el BehaviorSubject.
  getAllHours() {
    this.hours
      .get<HourInterface[]>('http://localhost:8080/horaflox/ver-horas')
      .subscribe((data) => {
        this.subjectHours.next(data);
      });
  }

  //ACTUALIZAR ESTOS MÉTODOS DE ABAJO
  createHour() {
    this.hours
      .post('http://localhost:8080/horaflox/guardar-horas', {})
      .subscribe((data: any) => {
        console.log(data)
      });
  }

  updateHour() {
    this.hours
      .put('http://localhost:8080/horaflox/actualizar-hora/{id}', {})
      .subscribe((data: any) => {
        console.log(data)
      });
  }

  deleteHour() {
    this.hours
      .delete('http://localhost:8080/horaflox/eliminar-hora/{id}', {})
      .subscribe((data: any) => {
        console.log(data)
      });
  }

}
