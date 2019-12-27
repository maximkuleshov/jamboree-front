import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventCustom } from './model/event';
import { ApplyRequest } from './model/apply-request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  findEvents() : Observable<EventCustom[]> {
    return this.http.get('http://localhost:8080/api/event')
    .pipe<EventCustom[]>(map<Object[], EventCustom[]>(eventList => {
      return eventList.map(e => {
        return new EventCustom(e);
      })
    }));
  }

  applyRequest(eventId: string) : Observable<String> {
    return this.http.post<String>("http://localhost:8080/api/event", new ApplyRequest("kme", eventId));
  }
}
