import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EjemploComponent } from './components/ejemplo/ejemplo.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
      },
      {
        path: 'ejemplo',
        component: EjemploComponent
      },
];
