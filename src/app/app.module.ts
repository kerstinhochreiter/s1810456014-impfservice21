import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeDe from '@angular/common/locales/de';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { VaccinationListItemComponent } from './vaccination-list-item/vaccination-list-item.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { VaccinationStoreService } from './shared/vaccination-store.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';
import { LocationStoreService } from './shared/location-store.service';
import { AuthenticationService } from './shared/authentication.service';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { UserStoreService } from './shared/user-store.service';
import { JwtInterceptorService } from './shared/jwt.interceptor.service';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
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
    LocationStoreService,
    UserStoreService,
    AuthenticationService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'de'
    }
  ]
})
export class AppModule {}
