import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewHoursComponent } from './pages/view-hours/view-hours.component';
import { RecordHoursComponent } from './pages/record-hours/record-hours.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
      },
      {
        path: 'inicio',
        component: DashboardComponent,
      },
      {
        path: 'inicio/ver-horas',
        component: ViewHoursComponent,
      },
      {
        path: 'inicio/registrar-horas',
        component: RecordHoursComponent,
      },
];
