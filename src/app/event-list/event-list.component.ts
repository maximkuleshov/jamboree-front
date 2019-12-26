import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../model/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.findEvents().subscribe(
      response => this.events = response
    );
  }

  applyRequest(eventId: number) {
    console.log(eventId);
    this.eventService.applyRequest(eventId).subscribe(
      response => console.log('Done')
    );
  }

}
