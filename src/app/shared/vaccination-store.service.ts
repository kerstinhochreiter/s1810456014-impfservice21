import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Vaccination } from "./vaccination";

@Injectable()
export class VaccinationStoreService {
  private api =
    "https://corana-impfservice21.s1810456014.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Vaccination>> {
    //array enthält Buch-Objekte
    return this.http
      .get<Array<Vaccination>>(`${this.api}/vaccinations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<Vaccination> {
    //array enthält Buch-Objekte
    return this.http
      .get<Vaccination>(`${this.api}/vaccination/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http
      .delete(`${this.api}/vaccination/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  /** 
  create(vaccination: Vaccination): Observable<any> {
    return this.http
      .post(`${this.api}/vaccination`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(vaccination: Vaccination): Observable<any> {
    return this.http
      .put(`${this.api}/vaccination/${vaccination.id}`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }**/

  private errorHandler(error: Error | any) {
    return throwError(error);
  }
}
