import { Component, Input, OnInit } from '@angular/core';
import { Vaccination } from '../shared/vaccination';

@Component({
  selector: 'a.is-vaccination-list-item',
  templateUrl: './vaccination-list-item.component.html'
})
export class VaccinationListItemComponent implements OnInit {
  @Input() vaccination:Vaccination;
  constructor() { }

  ngOnInit() {
  }

}