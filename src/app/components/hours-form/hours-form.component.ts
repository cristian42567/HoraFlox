import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HourInterface } from '../../interfaces/HourInterface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HoursService } from '../../services/hours.service';

@Component({
  selector: 'app-hours-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './hours-form.component.html',
  styleUrl: './hours-form.component.css'
})
export class HoursFormComponent implements OnInit {

  @Input() editMode: boolean = false; //Con Input para decirle al hijo si el formulario está en modo edición.
  @Output() closeEdit: EventEmitter<void> = new EventEmitter<void>(); //Con Output para decirle al componente padre que se cierre el formulario cuando se emita el evento.
  @Input() hour!: HourInterface; //Con Input para recibir los datos de la hora a editar.

  //Método que emite un evento al cerrar el formulario.
  closeForm() {
    this.closeEdit.emit();
  }

  form!: FormGroup; //Hacemos que el formulario sea reactivo.

  constructor(private fb: FormBuilder, private hoursService: HoursService, private router: Router) { }

  ngOnInit(): void {
    //Inicializo el formulario vacio.
    this.form = this.fb.group({
      hours: [],
      date: [''],
      description: [''],
    });

    //Si estamos editando y tiene datos, cargamos los valores del formulario con sus datos.
    if (this.editMode && this.hour) { //Comprobamos que estamos en modo edicion y que el objeto 'hour' continene datos.
      this.form.patchValue({ //Rellenamos el formulario con los valores del objeto 'hour'.
        hours: this.hour.hours,
        date: this.hour.date,
        description: this.hour.description,
      });
    }

  }

  //Función para actualizar las horas.
  rewriteHour() {
    if (this.form.valid) { //Comprobamos que el formulario sea válido antes de continuar.
      const updatedHour: HourInterface = this.form.value; //Obtenemos los datos del formulario como objeto 'HourInterface'.

      if (this.editMode && this.hour?.id) { //Verificamos que estamos en 'editMode' y que el id es válido.
        this.hoursService.updateHour(this.hour.id, updatedHour); //Llamamos al servicio para actualizar la hora en el backend.
        this.closeForm(); // Cerramos el formulario después de actualizar.
      }
    }
  }

  //Función para crear las horas.
  createNewHour() {
    if (this.form.valid) { //Comprobamos que el formulario sea válido antes de continuar.
      const newHour: HourInterface = this.form.value; //Obtenemos los datos del formulario como objeto 'HourInterface'.

      if (!this.editMode) { //Verificamos que no estamos en 'editMode'.
        this.hoursService.createHour(newHour).subscribe(() => { //Llamamos al servicio para crear la hora en el backend y nos suscribimos para que siga el código cuando esté creado.
          this.hoursService.getAllHours(); //Actualizamos la lista de horas llamando al servicio para obtener todas las horas.
          this.router.navigate(['inicio/ver-horas']); //Navegamos a la ruta para ver las horas.
        });
      }
    }
  }

}
