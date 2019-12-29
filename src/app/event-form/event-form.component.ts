import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { EventCustom } from '../model/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  eventForm: FormGroup;
  now = new Date();
  minDate = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
  errorRequest: boolean = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }
  
  onSubmit() {
    // if (this.eventForm.invalid) {
    //   return;
    // }

    const newEvent = <EventCustom> {
      title: this.eventForm.controls.title.value,
      description: this.eventForm.controls.description.value,
      startDate: this.eventForm.controls.startDate.value,
      endDate: this.eventForm.controls.endDate.value
    }

    this.eventService.createEvent(newEvent).subscribe(
      r => {
        this.router.navigateByUrl("events");
      },
      err => {
        this.errorRequest = true;
        this.errorMessage = err.error.message;
      });
  }

  cancel() {
    this.router.navigateByUrl("events");
  }

}
