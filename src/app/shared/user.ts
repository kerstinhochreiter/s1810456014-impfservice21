import { Time } from "@angular/common";
import { Vaccination } from "./vaccination";

export class User {
  constructor(
    public id: number,
    public svnr: number,
    public gender: number,
    public firstname: string,
    public lastname: string,
    public street: string,
    public number: number,
    public birth: Date,
    public phonenumber: number,
    public email: string,
    public password: string,
    public hasvaccination: boolean,
    public isadmin: boolean,
    public vaccination_id?: number
  ) {}
}
