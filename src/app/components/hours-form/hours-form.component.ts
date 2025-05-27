import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HourInterface } from '../../interfaces/HourInterface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hours-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './hours-form.component.html',
  styleUrl: './hours-form.component.css'
})
export class HoursFormComponent implements OnInit {

  @Input() editMode: boolean = false;
  @Output() closeEdit: EventEmitter<void> = new EventEmitter<void>();
  @Input() hour!: HourInterface;

  closeForm() {
    this.closeEdit.emit();
  }

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    //Inicializo el formulario vacio.
    this.form = this.fb.group({
      hours: [0],
      date: [''],
      description: [''],
    });

    //Si estamos editando cargamos los valores del formulario.
    if (this.editMode && this.hour) {
      this.form.patchValue({
        hours: this.hour.hours,
        date: this.hour.date,
        description: this.hour.description,
      });
    }

  }

  //Método para obtener los controles del template.
  get f() {
    return this.form.controls;
  }

}
