import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { LoginPageComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { EventFormComponent } from './event-form/event-form.component';
import {NgbModule, NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { NgbdSortableHeader } from './sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    LoginPageComponent,
    EventFormComponent,
    NgbdSortableHeader
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NgbDateAdapter, 
      useClass: NgbDateNativeAdapter
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
