import {Component, OnInit} from "@angular/core";

import {Day} from "../../shared.model";
import {DoctorProfileService} from "../../../doctor-profile/services/doctor-profile.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarData: Day[][] | undefined;

  constructor(private doctorProfileService: DoctorProfileService) {
  }

  ngOnInit() {
    this.calendarData = this.doctorProfileService.getCalendarData();
  }

  setWeekAppointments(day: Day) {
    if (day.disabled) return;

    this.doctorProfileService.setWeekAppointments(day.date);
  }
}
