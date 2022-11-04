import {Component, Input, OnDestroy, OnInit} from "@angular/core";

import {DoctorPrescriptionService} from "../../services/doctor-prescription.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit, OnDestroy {
  @Input() patientId: string | undefined;

  public addPrescriptionForm: FormGroup | undefined;

  constructor(private doctorPrescriptionService: DoctorPrescriptionService) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
  }

  private initForm() {
    this.addPrescriptionForm = new FormGroup<any>({
      'medicine': new FormControl('', [Validators.required]),
      'diagnose': new FormControl('', [Validators.required]),
      'afterBeforeMeal': new FormControl('', [Validators.required]),
      'duration': new FormControl('', [Validators.required])
    })
  }

  onAddPrescription() {
    if (!this.patientId || this.addPrescriptionForm?.invalid) return;

    this.doctorPrescriptionService.addPrescription(this.patientId, this.addPrescriptionForm?.value);
    this.addPrescriptionForm?.reset();
  }
}
