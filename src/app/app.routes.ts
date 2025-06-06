import { Routes } from '@angular/router';


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
    loadComponent: () => import('./views/afiliacion/afiliacion.component').then((m) => m.AfiliacionComponent),
  },
  {
    path: 'beneficios',
    loadComponent: () => import('./views/beneficios/beneficios.component').then((m) => m.BeneficiosComponent),
  },
  {
    path: 'servicios',
    loadComponent: () => import('./views/service-card/service-card.component').then((m) => m.ServiceCardComponent),
  },
  {
    path: 'infoServicio/:id',
    loadComponent: () => import('./views/info-servicios/info-servicios.component').then((m) => m.InfoServiciosComponent),
  },
  {
      path: 'perfil',
      loadComponent: () => import('./views/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.component').then((m) => m.LoginComponent),
},
{
  path: 'registro',
  loadComponent: () => import('./views/register/register.component').then((m) => m.RegisterComponent),
},
{
  path: 'automotor',
  loadComponent: () => import('./views/seguro-automotor/seguro-automotor.component').then((m) => m.SeguroAutomotorComponent),
},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
