import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {PrescriptionComponent} from "./components/prescription/prescription.component";
import {DoctorPrescriptionRoutingModule} from "./doctor-prescription-routing.module";
import {SharedModule} from "../shared/shared.module";
import {DoctorPrescriptionService} from "./services/doctor-prescription.service";
import {AddPrescriptionComponent} from "./components/add-prescription/add-prescription.component";

@NgModule({
  declarations: [
    PrescriptionComponent,
    AddPrescriptionComponent
  ],
  imports: [
    CommonModule,
    DoctorPrescriptionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DoctorPrescriptionService]
})
export class DoctorPrescriptionModule {}
