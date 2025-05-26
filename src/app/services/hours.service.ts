import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  private horas: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  horasObservable: Observable<any[]>=this.horas.asObservable();

  constructor(private hours: HttpClient) { }

  getCall() {
    this.hours
      .get('http://localhost:8080/horaflox/ver-horas')
      .subscribe((data: any) => {
        this.horas.next(data);
      });
  }

  postCall() {
    this.hours
      .post('http://localhost:8080/horaflox/guardar-horas', {})
      .subscribe((data: any) => {
        console.log(data)
      });
  }

  putCall() {
    this.hours
      .put('http://localhost:8080/horaflox/actualizar-hora/{id}', {})
      .subscribe((data: any) => {
        console.log(data)
      });
  }

  deleteCall() {
    this.hours
      .delete('http://localhost:8080/horaflox/eliminar-hora/{id}', {})
      .subscribe((data: any) => {
        console.log(data)
      });
  }

}
