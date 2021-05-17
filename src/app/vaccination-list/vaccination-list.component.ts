import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user';
import { UserStoreService } from '../shared/user-store.service';
import { Vaccination } from '../shared/vaccination';
import { VaccinationStoreService } from '../shared/vaccination-store.service';

@Component({
  selector: 'is-vaccination-list',
  templateUrl: './vaccination-list.component.html'
})
export class VaccinationListComponent implements OnInit {
  firstname: string = '';
  vaccinations: Vaccination[];
  @Output() showDetailsEvent = new EventEmitter<Vaccination>();

  constructor(
    private is: VaccinationStoreService,
    private authService: AuthenticationService,
    private is_user: UserStoreService
  ) {}

  showDetails(vaccination: Vaccination) {
    this.showDetailsEvent.emit(vaccination);
  }

  ngOnInit() {
    this.is.getAll().subscribe(res => (this.vaccinations = res));
  }
}
