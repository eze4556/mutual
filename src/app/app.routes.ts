import { BeneficiosComponent } from './views/descuentos/beneficios/beneficios.component';
import { Routes } from '@angular/router';
import { DescuentosComponent } from './views/descuentos/descuentos.component';

export const routes: Routes = [


  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
 {
    path: 'descuentos',
    loadComponent: () => import('./views/descuentos/descuentos.component').then((m) => m.DescuentosComponent),
  },
 {
    path: 'afiliacion',
    loadComponent: () => import('./views/descuentos/afiliacion/afiliacion.component').then((m) => m.AfiliacionComponent),
  },


  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
