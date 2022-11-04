export class Appointment {
  constructor(
    public date: Date,
    public fromTime: string,
    public toTime: string,
    public patientName: string,
    public clinicName: string) {
  }
}

export interface AppointmentGroups {
  [key: string]: Appointment[]
}

export class Clinic {
  constructor(public name: string, public email: string, public emirates: string) {
  }
}
