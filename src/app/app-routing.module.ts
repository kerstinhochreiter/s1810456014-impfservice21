import { NgModule } from '@angular/core';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { LoginComponent } from './login/login.component';
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'vaccinations', pathMatch: 'full' },
  //vacc list
  { path: 'vaccinations', component: VaccinationListComponent },
  //vacc detailpage
  { path: 'vaccinations/:id', component: VaccinationDetailsComponent },
  //login
  { path: 'login', component: LoginComponent },
  //if admin: add vacc
  { path: 'admin', component: VaccinationFormComponent },
  //if admin: edit vacc
  { path: 'admin/:id', component: VaccinationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
