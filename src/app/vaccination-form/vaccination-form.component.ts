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
  //liefer einen leeren Impftermin
  vaccination = VaccinationFactory.empty();
  isUpdatingVaccination = false;
  datePipeTime: string;
  datePipeDate: string;
  //assoziatives Array mit string als wert und anfangs ist es leer
  errors: { [key: string]: string } = {};
  selectedCity: number;

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

  selectChangeHandler(event: any) {
    this.selectedCity = event.target.value;
  }

  initVaccination() {
    this.datePipeDate = this.pipe.transform(
      this.vaccination.date,
      'tt:mm:jjjj'
    );
    this.datePipeTime = this.pipe.transform(this.vaccination.time, 'HH:mm');
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      //vorgefertigter Validator
      date: [this.vaccination.date, Validators.required],
      time: [this.datePipeTime, Validators.required],
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
    /**let updatedVacevent:Vacevent = VaceventFactory.fromObject(this.vaceventForm.value);
    console.log(this.vaceventForm.value.startTime);
    const startTimeNew = moment(this.vaceventForm.value.date + ' ' + this.vaceventForm.value.startTime).toDate();
    const endTimeNew = moment(this.vaceventForm.value.date + ' ' + this.vaceventForm.value.endTime).toDate();
    updatedVacevent.startTime = startTimeNew; 
    updatedVacevent.endTime = endTimeNew; 
    **/

    const updatedVaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );

    this.is_loc
      .getSingle(this.vaccinationForm.controls['id'].value)
      .subscribe(res => {
        updatedVaccination.location = res;
      });
  console.log(this.is_loc
      .getSingle(this.vaccinationForm.controls['id'].value));


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
