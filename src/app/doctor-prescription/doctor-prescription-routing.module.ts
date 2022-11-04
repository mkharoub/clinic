import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {PrescriptionComponent} from "./components/prescription/prescription.component";

const routes: Routes = [
  {
    path: '',
    component: PrescriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorPrescriptionRoutingModule {
}
