import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  vaccinations: Vaccination[];
  public userId;
  isadmin: boolean = false;
  @Input() user: User;
  @Output() showDetailsEvent = new EventEmitter<Vaccination>();

  constructor(
    private is: VaccinationStoreService,
    public authService: AuthenticationService,
    private is_user: UserStoreService
  ) {}

  showDetails(vaccination: Vaccination) {
    this.showDetailsEvent.emit(vaccination);
  }

  public getCurrentUser() {
    return Number.parseInt(localStorage.getItem('id'));
  }

  ngOnInit() {
    this.is.getAll().subscribe(res => (this.vaccinations = res));
    this.userId = Number.parseInt(localStorage.getItem('id'));
    this.is_user.getSingle(this.userId).subscribe(user => (this.user = user));
  }
}
