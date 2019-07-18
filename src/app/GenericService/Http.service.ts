import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from './app.error';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }
 
  getAll(url) {
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  get(url) {
    return this.http.get(url)
    .pipe(catchError(this.handleError));
  }

  create(url,resource) {
    return this.http.post(url, resource)
    .pipe(catchError(this.handleError));
  }

  fetch(url,resource) {
    return this.http.post(url, resource)
      .pipe(catchError(this.handleError));
  }

  update(url, resource) {
    return this.http.put(url, resource)
      .pipe(catchError(this.handleError));
  }

  delete(url) {
    return this.http.delete(url)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: Response) {
    return throwError(new AppError(error));
  }

}