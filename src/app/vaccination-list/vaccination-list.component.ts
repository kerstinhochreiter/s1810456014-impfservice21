import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { VaccinationStoreService } from "../shared/vaccination-store.service";

@Component({
  selector: "is-vaccination-list",
  templateUrl: "./vaccination-list.component.html"
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];
  @Output() showDetailsEvent = new EventEmitter<Vaccination>();

  constructor(private is: VaccinationStoreService) {}

  showDetails(vaccination: Vaccination) {
    this.showDetailsEvent.emit(vaccination);
  }

  ngOnInit() {
    this.is.getAll().subscribe(res => (this.vaccinations = res));
  }
}
