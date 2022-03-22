import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { PageNotFoundComponent } from './UIComponent/page-not-found/page-not-found.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'students', loadChildren: () => import('./view/student/student.module').then(m => m.StudentModule) },
  { path: 'coordinator', loadChildren: () => import('./view/co-ordinator/co-ordinator.module').then(m => m.CoOrdinatorModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [
  HomeComponent,
  PageNotFoundComponent
]