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

  hours: HourInterface[] = []; //Creamos un array de horas con su respectiva interfaz para almacenar las horas que se obtienen en un servicio.
  totalHours: number = 0; //Creamos una varible para contar el total de horas.

  ngOnInit(): void {
    //Nos suscribimos al observable del servicio 'HoursService' para recibir los datos cuando cambien.
    this.service.observableHours.subscribe((data) => {
      this.hours = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); //Ordenamos las fechas para que salgan en orden.
      this.totalHours = this.hours.reduce((acc, hour) => acc + hour.hours, 0); //Sumamos todas las horas del array hours.
    });
    this.service.getAllHours(); //Pedimos los datos a la API del backend.
  }

  @Input() editMode: boolean = false; //Con Input permitimos escuchar 'editMode' al hijo.
  EditClicked: boolean = false; //Variable para saber si el usuario ha hecho click en el botón editar.

  clickOnEdit(hour: HourInterface) {
    this.hourToEdit = { ...hour }; //Copiamos los datos de la fila 'hour' en hourToEdit.
    this.EditClicked = true; //Al hacer click en Editar 'editClicked' cambia a true y esto hará que se muestre el formulario.
    document.body.style.overflow = 'hidden'; //Al abrir el formulario de editar escondemos el scroll si es que lo tiene.
  }

  hourToEdit!: HourInterface; //Guradamos los datos de la hora que se va a editar para cargarlos en el formulario de editar.

  closeEditHandler() {
    this.EditClicked = false; //Ocultamos el formulario.
    document.body.style.overflow = 'visible'; // Restauramos el scroll al salir de editar.
  }

  deleteHour(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta hora?')) { //Preguntamos si estamos seguros de eliminar la hora.
      this.service.deleteHour(id); //Llamamos al servicio para eliminar la hora.
    }
  }

}
