import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VaccinationFactory } from "../shared/vaccination-factory";
import { VaccinationStoreService } from "../shared/vaccination-store.service";

@Component({
  selector: "app-vaccination-form",
  templateUrl: "./vaccination-form.component.html"
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  isUpdatingVaccination = false;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private is: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {}
}
