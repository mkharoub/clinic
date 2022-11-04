import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {Appointment, AppointmentGroups, Clinic} from "../doctor-profile.model";
import {Day} from "../../shared/shared.model";

@Injectable()
export class DoctorProfileService {
  private preparedAppointmentsSub = new BehaviorSubject<Appointment[][]>([]);
  private appointments: Appointment[] = [
    new Appointment(new Date(2022, 10, 15), '11:00 AM', '11:30 AM', 'Patient Name', 'Clinic Name'),
    new Appointment(new Date(2022, 10, 7), '9:00 AM', '9:30 AM', 'Patient Name', 'Clinic Name'),
    new Appointment(new Date(2022, 10, 15), '1:00 PM', '1:45 PM', 'Patient Name', 'Clinic Name'),
    new Appointment(new Date(2022, 10, 7), '10:00 AM', '10:30 AM', 'Patient Name', 'Clinic Name'),
    new Appointment(new Date(2022, 10, 19), '1:00 PM', '1:45 PM', 'Patient Name', 'Clinic Name'),
    new Appointment(new Date(2022, 10, 7), '1:00 PM', '1:45 PM', 'Patient Name', 'Clinic Name'),
  ];
  private clinics: Clinic[] = [
    new Clinic('Clinic A', 'clinica@clinics.com', 'Ajman'),
    new Clinic('Clinic B', 'clinicb@clinics.com', 'Sharjah'),
  ];
  private clinicsSub = new BehaviorSubject<Clinic[]>(this.clinics);

  private getGroupedAppointments(date?: Date) {
    const current = date? new Date(date.getTime()): new Date();
    const firstDay = new Date(current.setDate(current.getDate() - current.getDay())).getTime();
    const lastDay = new Date(current.setDate(current.getDate() - current.getDay() + 6)).getTime();
    const appointments = [...this.appointments];

    appointments.sort((a: Appointment, b: Appointment) => {
      return (new Date(a.date) as any) - (new Date(b.date) as any);
    });

    if (date) {
      return appointments.reduce((result: any, acm: Appointment) => {
        if (acm.date.getTime() >= firstDay && acm.date.getTime() <= lastDay) {
          const formattedDate = acm.date.toLocaleDateString();

          result[formattedDate] = result[formattedDate] || [];

          result[formattedDate].push(acm);
        }

        return result;
      }, {});
    }

    return appointments.reduce((result: any, acm: any) => {
      const formattedDate = acm.date.toLocaleDateString();

      result[formattedDate] = result[formattedDate] || [];

      result[formattedDate].push(acm);

      return result;
    }, {});
  }

  setWeekAppointments(date: Date) {
    const groupedAppointments = this.getGroupedAppointments(date);

    this.preparedAppointmentsSub.next(Object.values(groupedAppointments));
  }

  getPreparedAppointmentsSub() {
    return this.preparedAppointmentsSub.asObservable();
  }

  getCalendarData() {
    /**
     * P.S: I got this code from google
     */
    const date1 = new Date();
    const month = date1.getMonth();
    const year = date1.getFullYear();
    const day = date1.getDay();
    let date = new Date(year, month, day);
    let nextMonthDays = [];
    let prevMonthDays = [];
    let currentMonthDays = [];

    // Current month
    let currentMonth = new Date(date);
    currentMonth.setDate(1);
    let temp = new Date(currentMonth);
    temp.setMonth(currentMonth.getMonth() + 1);
    temp.setDate(0);
    let stop = temp.getDate();
    while (true) {
      currentMonthDays.push(new Date(currentMonth));
      if ((currentMonth.getDate() == stop))
        break;
      currentMonth.setDate(currentMonth.getDate() + 1);
    }

    // Next month
    let nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(1);
    while (true) {
      if (nextMonth.getDay() == 0)
        break;
      nextMonthDays.push(new Date(nextMonth));
      nextMonth.setDate(nextMonth.getDate() + 1);
    }

    // Previous month
    let prevMonth = new Date(date);
    prevMonth.setDate(0);
    while (true) {
      prevMonthDays.push(new Date(prevMonth));
      if (prevMonth.getDay() == 0)
        break;
      prevMonth.setDate(prevMonth.getDate() - 1);
    }

    prevMonthDays.reverse();

    // Flow helpers
    let counter = 0;
    let flow = -1;
    let currentMonthLen = currentMonthDays.length;
    let prevMonthLen = prevMonthDays.length;
    let nextMonthLen = nextMonthDays.length;
    let boundary = currentMonthDays[0].getDay() == 0
      ? (currentMonthLen + nextMonthLen) / 7
      : (currentMonthLen + prevMonthLen + nextMonthLen) / 7;

    let groupedAppointments: AppointmentGroups = this.getGroupedAppointments();
    let weeks: Day[][] = [];

    // Append cells to table
    for (let row = 0; row < boundary; row++) {
      let days: Day[] = [];

      for (let col = 0; col < 7; col++) {
        // Append previous month days
        if (counter < prevMonthLen && flow == -1) {
          // fix the flow if current month's starting day is Sat
          if (currentMonthDays[0].getDay() == 0) {
            flow++;
            counter = 0;
            col--;
            continue;
          }

          days.push({
            disabled: true,
            isToday: false,
            date: prevMonthDays[counter],
            appointments: groupedAppointments[prevMonthDays[counter].toLocaleDateString()] || []
          })
        }
        // Control the flow
        if (counter == prevMonthLen && flow == -1 ||
          counter == currentMonthLen && flow == 0) {
          flow++;
          counter = 0;
        }
        // Append current month days
        if (counter < currentMonthLen && flow == 0) {
          if (currentMonthDays[counter].getDate() == day) {
            days.push({
              disabled: false,
              isToday: true,
              date: currentMonthDays[counter],
              appointments: groupedAppointments[currentMonthDays[counter].toLocaleDateString()] || []
            })
          } else {
            days.push({
              disabled: false,
              isToday: false,
              date: currentMonthDays[counter],
              appointments: groupedAppointments[currentMonthDays[counter].toLocaleDateString()] || []
            })
          }
        }
        // Append next month days
        if (counter < nextMonthLen && flow == 1) {
          days.push({
            disabled: true,
            isToday: false,
            date: nextMonthDays[counter],
            appointments: groupedAppointments[nextMonthDays[counter].toLocaleDateString()] || []
          })
        }
        counter++;
      }

      weeks.push(days);
    }

    return weeks;
  }

  getClinics() {
    return [...this.clinics];
  }

  addClinic(clinic: Clinic) {
    this.clinics.push(clinic);
    this.clinicsSub.next(this.getClinics());
  }

  getClinicsSub() {
    return this.clinicsSub.asObservable();
  }
}
