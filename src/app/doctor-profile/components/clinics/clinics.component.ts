import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";

import {Clinic} from "../../doctor-profile.model";
import {DoctorProfileService} from "../../services/doctor-profile.service";

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent implements OnInit, OnDestroy {
  public clinics: Clinic[] | undefined;
  public showAddClinicForm = false;
  private getClinicsSub$: Subscription | undefined;

  constructor(private doctorProfileService: DoctorProfileService) {
  }

  ngOnInit() {
    this.clinics = this.doctorProfileService.getClinics();
    this.getClinicsSub$ = this.doctorProfileService.getClinicsSub().subscribe(clinics => this.clinics = clinics);
  }

  toggleAddClinicForm() {
    this.showAddClinicForm = !this.showAddClinicForm;
  }

  ngOnDestroy() {
    this.getClinicsSub$?.unsubscribe()
  }
}
