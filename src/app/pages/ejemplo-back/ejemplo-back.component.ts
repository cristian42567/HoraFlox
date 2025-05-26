import { Component } from '@angular/core';
import { HoursService } from '../../services/hours.service';

@Component({
  selector: 'app-ejemplo-back',
  imports: [],
  templateUrl: './ejemplo-back.component.html',
  styleUrl: './ejemplo-back.component.css'
})
export class EjemploBackComponent {

  constructor(private service: HoursService){}

  horas: any[] = [];

  ngOnInit(): void {

    this.service.horasObservable.subscribe((data:any[])=> {
      this.horas = data;
    });

    this.service.getCall();
  }
  
}
