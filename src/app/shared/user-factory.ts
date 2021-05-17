import { Vaccination } from './vaccination';
import { Location } from './location';
import { User } from './user';

export class UserFactory {
  static empty(): User {
    return new User(
      null,
      0,
      0,
      '',
      '',
      '',
      0,
      new Date(),
      0,
      '',
      '',
      false,
      false,
      0
    );
  }

  //gibt vacc zurück
  static fromObject(rawUser: any): User {
    return new User(
      rawUser.id,
      rawUser.svnr,
      rawUser.gender,
      rawUser.firstname,
      rawUser.lastname,
      rawUser.street,
      rawUser.number,
      typeof rawUser.birth === 'string'
        ? new Date(rawUser.birth)
        : rawUser.birth,
      rawUser.phonenumber,
      rawUser.email,
      rawUser.password,
      rawUser.hasvaccination,
      rawUser.isadmin,
      rawUser.vaccination_id
    );
  }
}
