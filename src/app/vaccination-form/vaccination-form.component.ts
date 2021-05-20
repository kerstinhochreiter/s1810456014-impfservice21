import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationStoreService } from '../shared/vaccination-store.service';
import { Vaccination } from '../shared/vaccination';
import { Location } from '../shared/location';
import { VaccinationFormErrorMessages } from './vaccination-form-error-messages';
import { LocationStoreService } from '../shared/location-store.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'is-vaccination-form',
  templateUrl: './vaccination-form.component.html'
})
export class VaccinationFormComponent implements OnInit {
  //@Input() locations: Location;
  locations: Location[];
  location: Location[];
  id: number;
  vaccinationForm: FormGroup;
  selectedLocation: number;
  //liefer einen leeren Impftermin
  vaccination = VaccinationFactory.empty();
  isUpdatingVaccination = false;
  //assoziatives Array mit string als wert und anfangs ist es leer
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private is: VaccinationStoreService,
    private is_loc: LocationStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private pipe: DatePipe
  ) {}
  ngOnInit() {
    this.is_loc.getAll().subscribe(res => (this.locations = res));
    //is der Parameter ID bei der URL angehängt --> wird es gerade upgedated
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingVaccination = true;
      this.is.getSingle(id).subscribe(vaccination => {
        this.vaccination = vaccination;
        //warum 2x init = asynchron; Rest Call dauert!
        this.initVaccination();
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    this.vaccination.location_id = this.selectedLocation;
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      //vorgefertigter Validator
      date: [this.vaccination.date, Validators.required],
      time: [this.vaccination.time, Validators.required],
      max_participants: [
        this.vaccination.max_participants,
        [Validators.required, Validators.minLength(1)]
      ],
      location_id: [this.vaccination.location_id, Validators.required]
    });
    this.vaccinationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  /**Formular kann verschiedene Zustände annehmen:
   *  valid: alles ok,
   *  invalid: mindestens 1 feld ist nicht ok,
   *  dirty: true = wenn der Nutzer bereits mit dem Formular argiert hat
   *  dirty: false = noch keine Interaktion -- noch keine Fehlermeldungen
   **/

  updateErrorMessages() {
    this.errors = {};
    for (const message of VaccinationFormErrorMessages) {
      const control = this.vaccinationForm.get(message.forControl);
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
    const updatedVaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );

    /**this.is_loc
      .getSingle(this.vaccinationForm.controls['id'].value)
      .subscribe(res => {
        updatedVaccination.location = res;
      });**/
    console.log(this.vaccinationForm.value.location_id);
    if (this.isUpdatingVaccination) {
      this.is.update(updatedVaccination).subscribe(res => {
        this.router.navigate(['../../vaccinations', updatedVaccination.id], {
          relativeTo: this.route
        });
      });
    } else {
      this.is.create(updatedVaccination).subscribe(res => {
        this.router.navigate(['../vaccinations'], { relativeTo: this.route });
      });
    }
  }
}
