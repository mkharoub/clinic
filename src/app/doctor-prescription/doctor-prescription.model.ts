export class Patient {
  constructor(public name: string, public id: string, public prescriptions: Prescription[]) {
  }
}

export interface Prescription {
  id: string;
  medicine: string;
  diagnose: string;
  afterBeforeMeal: string;
  duration: string;
}
