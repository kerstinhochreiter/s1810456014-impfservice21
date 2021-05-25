import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { retry } from 'rxjs/operators';

//Daten vom Login werden in einem Token gespeichert, diese Token wird dann mitgesendet und das System checkt, ob er gültig ist

interface Token {
  exp: number;
  user: {
    id: string;
    isadmin: string;
  };
}
@Injectable()
export class AuthenticationService {
  private api: string =
    'https://corana-impfservice21.s1810456014.student.kwmhgb.at/api/auth';
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  //speichert den JWT Token, sowie die aus dem Token extrahierte aktuelle UserID des eingeloggten Benutzers im local Storage
  public setLocalStorage(token: string) {
    const decodedToken = jwt_decode(token) as Token;
    localStorage.setItem('token', token);
    localStorage.setItem('id', decodedToken.user.id);
  }

  //der entsprechende Token wird wieder im local Storage entfernt
  logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    console.log('logged out');
  }

  public isLoggedIn() {
    if (localStorage.getItem('token')) {
      let token: string = localStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log('token expired');
        localStorage.removeItem('token');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getLoginStatus() {
    if (this.isLoggedIn()) {
      return 'Logout';
    } else {
      return 'Login';
    }
  }
}
