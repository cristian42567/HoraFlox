import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hours-form',
  imports: [RouterLink],
  templateUrl: './hours-form.component.html',
  styleUrl: './hours-form.component.css'
})
export class HoursFormComponent{

  @Input() editMode: boolean = false;
  @Output() closeEdit: EventEmitter<void> = new EventEmitter<void>();

  closeForm(){
    this.closeEdit.emit();
  }

}
