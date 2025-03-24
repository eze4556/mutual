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
    path: 'servicios',
    loadComponent: () => import('./views/service-card/service-card.component').then((m) => m.ServiceCardComponent),
  },
 {
    path: 'financiar',
    loadComponent: () => import('./views/financiar/financiar.component').then((m) => m.FinanciarComponent),
  },
  {
    path: 'salud',
    loadComponent: () => import('./views/salud/salud.component').then((m) => m.SaludComponent),
  },
 {
    path: 'seguros',
    loadComponent: () => import('./views/seguros/seguros.component').then((m) => m.SegurosComponent),
  },

 {
    path: 'juridico',
    loadComponent: () => import('./views/gabinete-juridico/gabinete-juridico.component').then((m) => m.GabineteJuridicoComponent),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
