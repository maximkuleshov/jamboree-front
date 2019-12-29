import { Component, OnInit, Directive, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { EventService } from '../event.service';
import { EventCustom } from '../model/event';
import { EventStatus } from '../model/event.status';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: EventCustom[];
  eventStatus: any = EventStatus;
  errorMessage: string = null;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private eventService: EventService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.refreshData();
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting
    if (direction != '') {
      this.events.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
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
    this.errorMessage = null;
    this.eventService.applyRequest(eventId).subscribe(
      response => {
        this.refreshData();
      },
      err => {
        this.errorMessage = err.error.message;
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

  canApply(event: EventCustom): boolean {
    const currentUser = this.authService.getCurrentUser().login;
    const status = this.getStatus(event);
    return !this.isParticipant(event)
              && (status == EventStatus.SCHEDULED || status == EventStatus.OPENED);
  }

  isParticipant(event: EventCustom): boolean {
    const currentUser = this.authService.getCurrentUser().login;

    return event.participants
      && event.participants.filter(u => u.login == currentUser).length > 0;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  addEvent() {
    this.router.navigateByUrl("/add-event");
  }
}
