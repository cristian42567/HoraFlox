import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HoursService } from '../../services/hours.service';
import { HourInterface } from '../../interfaces/HourInterface';
import { CommonModule } from '@angular/common';
import { HoursFormComponent } from "../../components/hours-form/hours-form.component";

@Component({
  selector: 'app-view-hours',
  imports: [RouterLink, CommonModule, HoursFormComponent],
  templateUrl: './view-hours.component.html',
  styleUrl: './view-hours.component.css'
})
export class ViewHoursComponent implements OnInit {

  constructor(private service: HoursService) { }

  //Creamos un array de horas con su respectiva interfaz para almacenar las horas que se obtienen en un servicio.
  hours: HourInterface[] = []; 

  ngOnInit(): void {
    //Nos suscribimos al observable del servicio 'HoursService' para recibir los datos cuando cambien.
    this.service.observableHours.subscribe((data) => {
      this.hours = data;
    });
    //Pedimos los datos a la API del backend.
    this.service.getAllHours();
  }

  @Input() editMode: boolean = false; //Con Input permitimos escuchar 'editMode' al hijo.
  EditClicked: boolean = false; //Variable para saber si el usuario ha hecho click en el botón editar.

  clickOnEdit(hour: HourInterface) {
    this.hourToEdit = { ...hour }; //Copiamos los datos de la fila 'hour' en hourToEdit.
    this.EditClicked = true; //Al hacer click en Editar 'editClicked' cambia a true y esto hará que se muestre el formulario.
  }

  hourToEdit!: HourInterface; //Guradamos los datos de la hora que se va a editar para cargarlos en el formulario de editar.

}
