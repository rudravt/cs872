import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordinatorComponent } from './module/coordinator/coordinator.component';
import { CoordinatorloginComponent } from '../../UIComponent/coordinatorlogin/coordinatorlogin.component';
import { RegisterComponent } from '../../UIComponent/register/register.component';
import { AddComponent } from '../../UIComponent/add/add.component';
import { ShowComponent } from './module/show/show.component';
import { HomeCoordinatorComponent } from './module/home-coordinator/home-coordinator.component';
import { DisplayComponent } from './module/display/display.component';
import { AuthService } from 'src/app/controller/auth.service';
import { EditComponent } from '../../UIComponent/edit/edit.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'coor-home', component: HomeCoordinatorComponent, canActivate: [AuthService] },
      { path: 'edit', component: EditComponent, canActivate: [AuthService] },
      { path: 'add', component: AddComponent, canActivate: [AuthService] },
      { path: 'show', component: ShowComponent, canActivate: [AuthService] },
      { path: 'display', component: DisplayComponent, canActivate: [AuthService] },
      { path: 'coordinatorlogin', component: CoordinatorloginComponent },
      { path: 'registration', component: RegisterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoOrdinatorRoutingModule { }
export const routingcomponents = [
  CoordinatorComponent,
  CoordinatorloginComponent,
  RegisterComponent,
  AddComponent,
  ShowComponent,
  HomeCoordinatorComponent,
  DisplayComponent,
]