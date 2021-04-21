import { Time } from "@angular/common";
import { User } from "./user";
export { User } from "./user";

export class Vaccination {
  constructor(
    public id: number,
    public max_participants: number,
    public date: Date,
    public time: Time,
    public location_id: number,
    public users?: User[]
  ) {}
}
