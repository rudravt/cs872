import { NgModule } from '@angular/core';
import { PostqueryComponent } from './module/postquery/postquery.component';
import { StudloginComponent } from './module/studlogin/studlogin.component';
import { StudentRoutingModule } from './student-routing.module';
import { MaterialModule } from 'src/app/Angular-material-modules/material.module';
import { RegisterStudentComponent } from './module/register-student/register-student.component';

@NgModule({
  declarations: [
    PostqueryComponent,
    StudloginComponent,
    RegisterStudentComponent
  ],

  imports: [
    StudentRoutingModule,
    MaterialModule
  ],

  exports: [
    StudloginComponent
  ]
})
export class StudentModule {
  constructor() {
    console.log('stud is loaded')
  }
}
