import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {WelcomeComponent} from "./shared/components/welcome/welcome.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./doctor-profile/doctor-profile.module').then(m => m.DoctorProfileModule)
  },
  {
    path: 'prescription',
    loadChildren: () => import('./doctor-prescription/doctor-prescription.module').then(m => m.DoctorPrescriptionModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
