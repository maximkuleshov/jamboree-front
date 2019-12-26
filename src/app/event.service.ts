import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './model/event';
import { ApplyRequest } from './model/apply-request';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  findEvents() {
    return this.http.get<Event[]>('http://localhost:8080/api/event');
  }

  applyRequest(eventId: number) {
    return this.http.post("http://localhost:8080/api/event", new ApplyRequest(666, eventId));
  }
}
