import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {ProfileComponent} from "./components/profile/profile.component";
import {DoctorProfileRoutingModule} from "./doctor-profile-routing.module";
import {SharedModule} from "../shared/shared.module";
import {AppointmentsComponent} from "./components/appointments/appointments.component";
import {ClinicsComponent} from "./components/clinics/clinics.component";
import {AddClinicComponent} from "./components/add-clinic/add-clinic.component";
import {DoctorProfileService} from "./services/doctor-profile.service";

@NgModule({
  declarations: [
    ProfileComponent,
    AppointmentsComponent,
    ClinicsComponent,
    AddClinicComponent
  ],
  imports: [
    CommonModule,
    DoctorProfileRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [DoctorProfileService]
})
export class DoctorProfileModule {}
