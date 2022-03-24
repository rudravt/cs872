import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { PageNotFoundComponent } from './UIComponent/page-not-found/page-not-found.component';
import { MaterialModule } from './Angular-material-modules/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './view/InfoPopUp/popup/popup.component';
import { DisplaySeminarComponent } from './view/display-seminar/display-seminar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    PopupComponent,
    DisplaySeminarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports: [DisplaySeminarComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('home is loaded')
  }
}
