import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HoursService } from '../../services/hours.service';
import { HourInterface } from '../../interfaces/HourInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-hours',
  imports: [RouterLink, CommonModule],
  templateUrl: './view-hours.component.html',
  styleUrl: './view-hours.component.css'
})
export class ViewHoursComponent implements OnInit {

  constructor(private service: HoursService){}
 
  hours: HourInterface[] = [];

   ngOnInit(): void {
    this.service.observableHours.subscribe((data)=>{
      this.hours = data;
    });
    this.service.getAllHours();
  }

}
