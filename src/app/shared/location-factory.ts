import { Vaccination } from "./vaccination";
import { Location } from "./location";
import { User } from "./user";

export class LocationFactory {
  static empty(): Location {
    return new Location(null, 0, "", "", 0, "");
  }

  //gibt vacc zurück
  static fromObject(rawLocation: any): Location {
    return new Location(
      rawLocation.id,
      rawLocation.plz,
      rawLocation.city,
      rawLocation.l_street,
      rawLocation.l_number,
      rawLocation.description
    );
  }
}
