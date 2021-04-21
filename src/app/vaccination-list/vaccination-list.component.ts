import { Component, OnInit } from "@angular/core";
import { Vaccination } from "../shared/vaccination";

@Component({
  selector: "is-vaccination-list",
  templateUrl: "./vaccination-list.component.html"
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];

  constructor() {}

  ngOnInit() {}
}
