import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GaurdAttendeeService } from '../../controller/gaurd-attendee.service';
import { PostqueryComponent } from '../student/module/postquery/postquery.component';
import { StudloginComponent } from '../student/module/studlogin/studlogin.component';

const routes: Routes = [
  { path: '', component: PostqueryComponent, canActivate: [GaurdAttendeeService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
export const routingcomponents = [
  PostqueryComponent,
  StudloginComponent,
]