import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";

import {Appointment} from "../../doctor-profile.model";
import {DoctorProfileService} from "../../services/doctor-profile.service";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  public appointments: Appointment[][] | undefined;
  private preparedAppointmentsSub$: Subscription | undefined;

  constructor(private doctorProfileService: DoctorProfileService) {
  }

  ngOnInit() {
    this.doctorProfileService.setWeekAppointments(new Date());
    this.preparedAppointmentsSub$ = this.doctorProfileService.getPreparedAppointmentsSub().subscribe(appointments => {
      this.appointments = appointments
    });
  }

  ngOnDestroy() {
    this.preparedAppointmentsSub$?.unsubscribe();
  }
}
