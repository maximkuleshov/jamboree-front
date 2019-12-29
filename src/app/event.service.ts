import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventCustom } from './model/event';
import { ApplyRequest } from './model/apply-request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  findEvents() : Observable<EventCustom[]> {
    return this.http.get<EventCustom[]>(environment.baseUrl + '/api/event')
     .pipe<EventCustom[]>(map<Object[], EventCustom[]>(eventList => {
       return eventList.map(e => {
         return new EventCustom(e);
       })
     }));
  }

  applyRequest(eventId: string) : Observable<any> {
    return this.http.post<String>(environment.baseUrl + "/api/event/apply", 
        new ApplyRequest(this.authService.getCurrentUser().login, eventId));
  }

  createEvent(event: EventCustom) {
    return this.http.post<String>(environment.baseUrl + "/api/event", event);
  }
}
