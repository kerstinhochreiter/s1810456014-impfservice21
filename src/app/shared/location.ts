import { Vaccination } from "./vaccination";

export class Location {
  constructor(
    public id: number,
    public plz: number,
    public city: string,
    public l_street: string,
    public l_number: string,
    public description: string,
    public vaccinations?: Vaccination[]
  ) {}
}
