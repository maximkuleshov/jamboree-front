import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login/login.component';
import { EventListComponent } from './event-list/event-list.component';
import { AuthGuard } from './auth.guard';
import { EventFormComponent } from './event-form/event-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginPageComponent },
  { path: 'events', component: EventListComponent, canActivate: [AuthGuard]},
  { path: 'add-event', component: EventFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
