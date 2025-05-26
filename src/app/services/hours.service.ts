import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  constructor(private hours: HttpClient) { }

  llamadaGet() {
    this.hours.get('http://localhost:8080/horaflox/horas').subscribe((data: any) => {
      console.log(data)
    })
  }
  
}
