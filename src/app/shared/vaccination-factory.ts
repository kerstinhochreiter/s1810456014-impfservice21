import { Vaccination } from "./vaccination";
import { Vaccination } from "./vaccination";
export class VaccinationFactory {
  //legt eine leere dummy-impfung an
  static empty(): Vaccination {
    return new Vaccination(
      null, //id
      0, //max_participants
      new Date(), //date
      "", //time
      [
        { id: 0, plz: 0, city: "", l_street: "", l_number: "", description: "" }
      ], //location_id
      [
        {
          id: 0,
          svnr: 0,
          gender: 0,
          firstname: "",
          lastname: "",
          street: "",
          number: "",
          birth: "",
          phonenumber: 0,
          email: "",
          password: "",
          hasvaccination: false,
          isadmin: false,
          vaccination_id: 0
        }
      ]
    );
  }
  //gibt vacc zurück
  static fromObject(rawVaccination: any): Vaccination {
    return new Vaccination(
      rawVaccination.id,
      rawVaccination.max_participants,
      typeof rawVaccination.date === "string"
        ? new Date(rawVaccination.date)
        : rawVaccination.date,
      rawVaccination.time,
      rawVaccination.location_id,
      rawVaccination.users
    );
  }
}
