import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from '../shared/vaccination';
import { Location } from '../shared/location';
import { VaccinationStoreService } from '../shared/vaccination-store.service';
import { LocationStoreService } from '../shared/location-store.service';
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
  @Input() location: Location;
  @Output() showListEvent = new EventEmitter<any>();

  constructor(
    private is: VaccinationStoreService,
    private is_loc: LocationStoreService,
    private is_user: UserStoreService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  //ngOnInit() {}

  ngOnInit() {
    //man holt sich die gesamte Route und durch snapshot params bekommt man z.B :isbn
    const params = this.route.snapshot.params;
    //gibt mir die genau dieses Buch mit der ISBN
    this.is_loc.getSingle(params['id']).subscribe(res => (this.location = res));
    this.is.getSingle(params['id']).subscribe(res => (this.vaccination = res));

    this.userId = Number.parseInt(localStorage.getItem('id'));
    this.is_user.getSingle(this.userId).subscribe(u => (this.user = u));
  }

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

  editVaccinationStatus(e: Event, user) {
    let value = (<HTMLInputElement>e.target).value;
    console.log(user);
    this.user = user;
    this.user.hasvaccination = Boolean(JSON.parse(value));
    this.is_user.update(this.user).subscribe(res => {});
  }

  addUserToVaccination() {
    this.user.vaccination_id = this.vaccination.id;
    this.is_user.update(this.user).subscribe(res => {});
  }

  removeUserFromVaccination() {
    this.user.vaccination_id = null;
    this.is_user.update(this.user).subscribe(res => {});
  }

  checkMaxParticipants() {
    console.log(this.vaccination.max_participants);
    if (this.vaccination.users.length < this.vaccination.max_participants) {
      return false;
    }
    return true;
  }

  getcurParticipants() {
    return this.vaccination.users.length;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
