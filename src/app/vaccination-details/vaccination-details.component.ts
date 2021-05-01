import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Vaccination } from "../shared/vaccination";
import { VaccinationStoreService } from "../shared/vaccination-store.service";

@Component({
  selector: "is-vaccination-details",
  templateUrl: "./vaccination-details.component.html"
})
export class VaccinationDetailsComponent implements OnInit {
  @Input() vaccination: Vaccination;
  @Output() showListEvent = new EventEmitter<any>();

  constructor(
    private is: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //ngOnInit() {}

  ngOnInit() {
    //man holt sich die gesamte Route und durch snapshot params bekommt man z.B :isbn
    const params = this.route.snapshot.params;
    //gibt mir die genau dieses Buch mit der ISBN
    this.is.getSingle(params["id"]).subscribe(res => (this.vaccination = res));
  }

  removeVaccination() {
    if (confirm("Wollen Sie den Impftermin wirklich löschen?")) {
      //asynchron!! --> Inhalt von Subscribe wird erst ausgeführt wenn REST Call fertig ist
      //Was verlang jeder asynchroner aufruf?
      //eine Callback Funktion
      this.is.remove(this.vaccination.id).subscribe(res => {
        this.router.navigate(["../"], { relativeTo: this.route });
      });
    }
  }
}
