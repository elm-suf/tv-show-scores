import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
