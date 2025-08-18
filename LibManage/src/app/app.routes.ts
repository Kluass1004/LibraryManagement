import { Routes } from '@angular/router';
import {HomeComponent} from '../app/home/home.component'

export const routes: Routes = [
    {
    path: '',
    loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  },
];
