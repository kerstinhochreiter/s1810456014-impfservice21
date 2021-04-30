import { Time } from "@angular/common";
import { User } from "./user";
import { Location } from "./location";

export class Vaccination {
  constructor(
    public id: number,
    public max_participants: number,
    public date: Date,
    public time: Date,
    public location_id: number,
    public location: Location,
    public users?: User[]
  ) {}
}
