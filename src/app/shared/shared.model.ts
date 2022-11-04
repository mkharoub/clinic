import {Appointment} from "../doctor-profile/doctor-profile.model";

export interface Day {
  disabled: boolean;
  isToday: boolean;
  date: Date;
  appointments?: Appointment[];
}
