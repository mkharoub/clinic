import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

import {Patient} from "../../doctor-prescription.model";
import {DoctorPrescriptionService} from "../../services/doctor-prescription.service";

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit, OnDestroy {
  public patients: Patient[] | undefined;
  public selectedPatient = '';
  public patient: Patient | undefined;
  public showAddPrescriptionForm = false;
  private patientsSub$: Subscription | undefined;

  constructor(private doctorPrescriptionService: DoctorPrescriptionService, private router: Router) {
  }

  ngOnInit() {
    this.patients = this.doctorPrescriptionService.getPatients();
    this.patientsSub$ = this.doctorPrescriptionService.getPatientsSub()
      .subscribe(patients => this.patients = patients)
  }

  onSelectPatient() {
    if (!this.selectedPatient) return;

    this.patient = this.doctorPrescriptionService.getPatient(this.selectedPatient);
  }

  onRemovePrescription(patientId: string, prescriptionId: string) {
    this.doctorPrescriptionService.removePrescription(patientId, prescriptionId);
  }

  ngOnDestroy() {
    this.patientsSub$?.unsubscribe();
  }

  toggleAddPrescriptionForm() {
    this.showAddPrescriptionForm = !this.showAddPrescriptionForm;
  }

  onGoBack() {
    this.router.navigate(['/profile']);
  }
}
