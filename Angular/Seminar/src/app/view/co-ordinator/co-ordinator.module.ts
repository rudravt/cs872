import { NgModule } from '@angular/core';

import { AddComponent } from '../../UIComponent/add/add.component';
import { CoordinatorComponent } from './module/coordinator/coordinator.component';
import { CoordinatorloginComponent } from '../../UIComponent/coordinatorlogin/coordinatorlogin.component';
import { DisplayComponent } from './module/display/display.component';
import { EditComponent } from '../../UIComponent/edit/edit.component';
import { HomeCoordinatorComponent } from './module/home-coordinator/home-coordinator.component';
import { RegisterComponent } from '../../UIComponent/register/register.component';
import { ShowComponent } from './module/show/show.component';
import { MaterialModule } from 'src/app/Angular-material-modules/material.module';
import { CalendarModule } from 'primeng/calendar';
import { CoOrdinatorRoutingModule } from './co-ordinator-routing.module';
import { ConnectBackendService } from 'src/app/controller/connect-backend.service';

@NgModule({
  declarations: [
    AddComponent,
    CoordinatorComponent,
    CoordinatorloginComponent,
    DisplayComponent,
    EditComponent,
    HomeCoordinatorComponent,
    RegisterComponent,
    ShowComponent,
  ],

  imports: [
    MaterialModule,
    CoOrdinatorRoutingModule,
    CalendarModule
  ],

  exports: [
    CoordinatorloginComponent,
    RegisterComponent,
  ],

  providers: [
    ConnectBackendService
  ]
})
export class CoOrdinatorModule {
  constructor() {
    console.log('coor is loaded')
  }
}
