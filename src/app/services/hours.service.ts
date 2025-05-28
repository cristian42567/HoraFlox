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

  //Método create para crear la hora.
  createHour(newHour: HourInterface) {
    return this.hours.post('http://localhost:8080/horaflox/guardar-hora', newHour)
    //No pongo .subscribe porque lo pongo en 'hours-form.component.ts', sino no puedo poner el navigate después de la navegación.
  }

  //Método put para actualizar la hora.
  updateHour(id: number, updatedHour: HourInterface) {
    this.hours
      .put(`http://localhost:8080/horaflox/actualizar-hora/${id}`, updatedHour)
      .subscribe(() => {
        this.getAllHours();
      });
  }

  //ACTUALIZAR MÉTODO
  deleteHour() {
    this.hours
      .delete('http://localhost:8080/horaflox/eliminar-hora/{id}', {})
      .subscribe((data: any) => {
        console.log(data)
      });
  }

}
