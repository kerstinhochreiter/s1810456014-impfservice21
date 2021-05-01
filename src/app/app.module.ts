import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import localeDe from "@angular/common/locales/de";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { VaccinationListComponent } from "./vaccination-list/vaccination-list.component";
import { VaccinationListItemComponent } from "./vaccination-list-item/vaccination-list-item.component";
import { VaccinationDetailsComponent } from "./vaccination-details/vaccination-details.component";
import { VaccinationStoreService } from "./shared/vaccination-store.service";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import { VaccinationFormComponent } from "./vaccination-form/vaccination-form.component";
registerLocaleData(localeDe);

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    VaccinationListComponent,
    VaccinationListItemComponent,
    VaccinationDetailsComponent,
    LoginComponent,
    VaccinationFormComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    VaccinationStoreService,
    {
      provide: LOCALE_ID,
      useValue: "de"
    }
  ]
})
export class AppModule {}
