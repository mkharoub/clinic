import {Component, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";

import {Clinic} from "../../doctor-profile.model";
import {DoctorProfileService} from "../../services/doctor-profile.service";

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})
export class AddClinicComponent implements OnInit {
  @ViewChild('addClinicForm') addClinicForm: NgForm | undefined;

  constructor(private doctorProfileService: DoctorProfileService) {
  }

  ngOnInit() {
  }

  onAddClinic() {
    if (this.addClinicForm?.invalid) return;

    const name = this.addClinicForm?.value.name;
    const email = this.addClinicForm?.value.email;
    const emirates = this.addClinicForm?.value.emirates;
    const clinic = new Clinic(name, email, emirates);

    this.doctorProfileService.addClinic(clinic);
    this.addClinicForm?.reset();
  }
}
