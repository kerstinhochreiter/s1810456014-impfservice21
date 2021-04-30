import { Vaccination } from "./vaccination";
import { Location } from "./location";
import { User } from "./user";

export class VaccinationFactory {
  static empty(): Vaccination {
    return new Vaccination(
      null,
      0,
      new Date(),
      new Date(),
      0,
      { id: 0, plz: 0, city: "", l_street: "", l_number: "", description: "" },
      [
        {
          id: 0,
          svnr: 0,
          gender: 0,
          firstname: "",
          lastname: "",
          street: "",
          number: 0,
          birth: new Date(),
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
      typeof rawVaccination.time === "string"
        ? new Date(rawVaccination.time)
        : rawVaccination.time,
      rawVaccination.location_id,
      rawVaccination.location,
      rawVaccination.users
    );
  }
}
