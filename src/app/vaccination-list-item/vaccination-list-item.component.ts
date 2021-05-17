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

  ngOnInit() {
    //console.log(this.vaccination.location);
    //console.log(this.vaccination.users);
    
  }
}
