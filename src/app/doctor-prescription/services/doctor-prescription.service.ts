import {Injectable} from "@angular/core";
import {Patient, Prescription} from "../doctor-prescription.model";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DoctorPrescriptionService {
  private patients: Patient[] = [
    {
      name: 'Patient1',
      id: '1',
      prescriptions: [
        {
          id: '1',
          medicine: 'Medicine1',
          diagnose: 'Diagnose1',
          afterBeforeMeal: 'After meal',
          duration: '14 days',
        },
        {
          id: '2',
          medicine: 'Medicine2',
          diagnose: 'Diagnose2',
          afterBeforeMeal: 'Before meal',
          duration: '10 days',
        },
      ]
    },
    {
      name: 'Patient2',
      id: '2',
      prescriptions: [
        {
          id: '1',
          medicine: 'Medicine1',
          diagnose: 'Diagnose1',
          afterBeforeMeal: 'After meal',
          duration: '14 days',
        },
        {
          id: '2',
          medicine: 'Medicine2',
          diagnose: 'Diagnose2',
          afterBeforeMeal: 'Before meal',
          duration: '10 days',
        },
      ]
    },
  ];
  private patientsSub = new BehaviorSubject<Patient[]>(this.patients);

  getPatients() {
    return [...this.patients];
  }

  getPatient(id: string) {
    return this.getPatients().find(patient => {
      return patient.id === id
    });
  }

  removePrescription(patientId: string, prescriptionId: string) {
    const patients = [...this.patients];
    const patient = patients.find(patient => {
      return patient.id === patientId
    });

    if (!patient) return;

    const prescriptionIndex = patient.prescriptions.findIndex(prescription => {
      return prescription.id === prescriptionId
    });

    patient.prescriptions.splice(prescriptionIndex, 1);

    this.patients = patients;
    this.patientsSub.next(this.getPatients());
  }

  getPatientsSub() {
    return this.patientsSub.asObservable();
  }

  addPrescription(patientId: string, prescription: Prescription) {
    const patients = [...this.patients];
    const patient = patients.find(patient => {
      return patient.id === patientId
    });

    if (!patient) return;

    patient.prescriptions.push(prescription);

    this.patients = patients;
    this.patientsSub.next(this.getPatients());
  }
}
