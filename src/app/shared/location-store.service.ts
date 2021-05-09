import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Location } from "./location";

@Injectable()
export class LocationStoreService {
  private api =
    "https://corana-impfservice21.s1810456014.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Location>> {
    //array enthält Buch-Objekte
    return this.http
      .get<Array<Location>>(`${this.api}/locations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<Location> {
    //array enthält Buch-Objekte
    return this.http
      .get<Location>(`${this.api}/location/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http
      .delete(`${this.api}/location/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  create(location: Location): Observable<any> {
    return this.http
      .post(`${this.api}/location/save`, location)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(location: Location): Observable<any> {
    return this.http
      .put(`${this.api}/location/${location.id}`, location)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any) {
    return throwError(error);
  }
}
