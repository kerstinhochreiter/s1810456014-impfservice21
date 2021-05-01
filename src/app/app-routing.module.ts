import { NgModule } from "@angular/core";
import { VaccinationListComponent } from "./vaccination-list/vaccination-list.component";
import { RouterModule, Routes } from "@angular/router";
import { VaccinationDetailsComponent } from "./vaccination-details/vaccination-details.component";
import { LoginComponent } from "./login/login.component";
import { VaccinationFormComponent } from "./vaccination-form/vaccination-form.component";

const routes: Routes = [
  { path: "", redirectTo: "vaccinations", pathMatch: "full" },
  { path: "vaccinations", component: VaccinationListComponent },
  { path: "vaccinations/:id", component: VaccinationDetailsComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", component: VaccinationFormComponent },
    { path: "admin/:id", component: VaccinationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
