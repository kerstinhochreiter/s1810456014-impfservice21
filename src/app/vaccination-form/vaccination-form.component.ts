import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VaccinationFactory } from "../shared/vaccination-factory";
import { VaccinationStoreService } from "../shared/vaccination-store.service";
import { Vaccination } from "../shared/vaccination";

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
  /** 
  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingVaccination = true;
      this.is.getSingle(id).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initVaccination();
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    //Wir bauen das Formular Model
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      date: [this.vaccination.date, Validators.required],
      time: this.vaccination.time,
      max_participants: [
        this.vaccination.max_participants,
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
      ]
    });
    /**this.vaccinationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }**/

  /**updateErrorMessages() {
    this.errors = {};
    for (const message of VaccinationFormErrorMessages) {
      const control = this.bookForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    console.log(this.vaccinationForm.value);

    //filters null values, wenn kein Bild ist dann nichts in die DB schreiben
    this.vaccinationForm.value.images = this.vaccinationForm.value.images.filter(
      thumbnail => thumbnail.url
    );
    const updatedVaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );
    //console.log(updatedVaccination);

    //just a hack - did not care about authors
    updatedVaccination.users = this.vaccination.users;
    //updatedVaccination.users_id = 1;

    if (this.isUpdatingVaccination) {
      this.is.update(updatedVaccination).subscribe(res => {
        this.router.navigate(["../../vaccinations", updatedVaccination.id], {
          relativeTo: this.route
        });
      });
    } else {
      this.is.create(updatedVaccination).subscribe(res => {
        this.router.navigate(["../vaccinations"], { relativeTo: this.route });
      });
    }
  }**/
}
