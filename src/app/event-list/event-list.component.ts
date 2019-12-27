import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventCustom } from '../model/event';
import { EventStatus } from '../model/event.status';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: EventCustom[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.eventService.findEvents().subscribe(
      response => {
        this.events = response;
        this.events.forEach(e => e.status = this.getStatus(e));
      }
    );
  }

  applyRequest(eventId: string) {
    this.eventService.applyRequest(eventId).subscribe(
      response => {
        console.log('Done');
        this.refreshData();
      }
    );
  }

  getStatus(event: EventCustom) : EventStatus {
    if (event.endDate.getTime() < Date.now()) {
        return EventStatus.FINISHED;
    } else if (Date.now() > event.startDate.getTime()) {
        return EventStatus.IN_PROGRESS;
    } else if (Date.now() - event.startDate.getTime() > (10 * 24 * 3600 * 1000)) {
        return EventStatus.SCHEDULED;
    } else {
        return EventStatus.OPENED;
    }
  };

  isUserAssigned(event: EventCustom): boolean {
    return event.participants != null && event.participants.filter(u => u.login == "kme").length > 0;
  }


}
