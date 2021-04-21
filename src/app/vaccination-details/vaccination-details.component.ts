import { Component, Input, OnInit } from "@angular/core";
import { Vaccination } from "../shared/vaccination";

@Component({
  selector: "is-vaccination-details",
  templateUrl: "./vaccination-details.component.html"
})
export class VaccinationDetailsComponent implements OnInit {
  @Input() vaccination: Vaccination;

  constructor() {}

  ngOnInit() {}
}
