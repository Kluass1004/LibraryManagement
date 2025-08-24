import { Routes } from '@angular/router';
import {HomeComponent} from '../app/home/home.component'
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent,

  },
  {
        path:'users',
        canActivate: [AuthGuard],
        component:UsersComponent
  }, 
   {
        path:'admin',
        canActivate: [AuthGuard],
        component:AdminComponent
     }
    
 
];