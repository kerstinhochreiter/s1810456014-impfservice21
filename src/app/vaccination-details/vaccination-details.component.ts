import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from '../shared/vaccination';
import { Location } from '../shared/location';
import { VaccinationStoreService } from '../shared/vaccination-store.service';
import { User } from '../shared/user';
import { UserFactory } from '../shared/user-factory';
import { UserStoreService } from '../shared/user-store.service';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'is-vaccination-details',
  templateUrl: './vaccination-details.component.html'
})
export class VaccinationDetailsComponent implements OnInit {
  public userId;
  user: User = UserFactory.empty();
  @Input() vaccination: Vaccination;
  @Output() showListEvent = new EventEmitter<any>();

  constructor(
    private is: VaccinationStoreService,
    private is_user: UserStoreService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    //man holt sich die gesamte Route und durch snapshot params bekommt man z.B :isbn
    const curVaccination = this.route.snapshot.params;
    //gibt mir die genau diese Impfung mit der ID
    this.is
      .getSingle(curVaccination['id'])
      .subscribe(res => (this.vaccination = res));
    this.userId = Number.parseInt(localStorage.getItem('id'));
    console.log(this.userId);
    this.is_user.getSingle(this.userId).subscribe(u => (this.user = u));
  }

  //Impftermin löschen
  removeVaccination() {
    if (confirm('Wollen Sie den Impftermin wirklich löschen?')) {
      //asynchron!! --> Inhalt von Subscribe wird erst ausgeführt wenn REST Call fertig ist
      //Was verlang jeder asynchroner aufruf?
      //eine Callback Funktion
      this.is.remove(this.vaccination.id).subscribe(res => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }

  //Impftermin bearbeiten
  editVaccinationStatus(e: Event, user) {
    //aktuellen Status des Dropdowns auslesen
    let curVacStatus = (<HTMLInputElement>e.target).value;
    this.user = user;
    this.user.hasvaccination = Boolean(JSON.parse(curVacStatus));
    this.is_user.update(this.user).subscribe(res => {});
  }

  //angemeldeten User zu einem Impftermin hinzufügen
  addUserToVaccination() {
    if (confirm('Wollen Sie sich wirklich zu diesem Impftermin anmelden?')) {
      this.user.vaccination_id = this.vaccination.id;
      this.is_user.update(this.user).subscribe(res => {});
    }
  }

  //angemeldeten User von einem Impftermin entfernen
  removeUserFromVaccination() {
    if (confirm('Wollen Sie sich wirklich ihren Impftermin stornieren?')) {
      this.user.vaccination_id = null;
      this.is_user.update(this.user).subscribe(res => {});
    }
  }

  //wenn ja: es sind noch freie Plätze
  //wenn nein: alle Plätze belegt
  checkMaxParticipants() {
    if (this.vaccination.users.length < this.vaccination.max_participants) {
      return false;
    }
    return true;
  }

  //lieferte aktuelle Anzahl der Impfteilnehmer*innen zu einem Termin
  getcurParticipants() {
    return this.vaccination.users.length;
  }

  //ist User aktuell eingeloggt oder nicht
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
