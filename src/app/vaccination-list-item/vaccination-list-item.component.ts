import { Component, Input, OnInit } from '@angular/core';
import { UserStoreService } from '../shared/user-store.service';
import { Vaccination } from '../shared/vaccination';

@Component({
  selector: 'tr.is-vaccination-list-item',
  templateUrl: './vaccination-list-item.component.html'
})
export class VaccinationListItemComponent implements OnInit {
  @Input() vaccination: Vaccination;
  constructor(is_user: UserStoreService) {}

  ngOnInit() {}

  getNrOfAvailable() {
    const nrOfPlaces =
      this.vaccination.max_participants - this.vaccination.users.length;
    if (nrOfPlaces == 0) {
      return 'Keine freien Plätze';
    } else {
      return nrOfPlaces;
    }
  }
}
