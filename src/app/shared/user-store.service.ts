import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class UserStoreService {
  private api =
    'https://corana-impfservice21.s1810456014.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<User>> {
    //array enthält Buch-Objekte
    return this.http
      .get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<User> {
    //array enthält Buch-Objekte
    return this.http
      .get<User>(`${this.api}/user/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http
      .delete(`${this.api}/user/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(user: User): Observable<any> {
    return this.http
      .post(`${this.api}/user/save`, user)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(user: User): Observable<any> {
    return this.http
      .put(`${this.api}/user/${user.id}`, user)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any) {
    return throwError(error);
  }
}
