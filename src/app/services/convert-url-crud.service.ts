import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { ErrorHandlerService } from "./error-handler.service";
//model
import { UrlConvert } from '../model/Url.mode';

@Injectable({
  providedIn: 'root'
})
export class ConvertUrlCrudService {

  private url = "http://localhost:3000/convert";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    ) { }

  fetchAll(): Observable<UrlConvert[]> {
    return this.http
    .get<UrlConvert[]>(this.url, {responseType : "json"}).pipe(
      tap((_) => console.log('fetched datas'))
    )
  }

  post(urldirected: Partial<UrlConvert>): Observable<any> {
    return this.http
      .post(this.url, urldirected, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  get(paramID: Partial<UrlConvert>): Observable<any> {
    console.log(paramID)
    return this.http
    .get<UrlConvert[]>(this.url+'/'+paramID, {responseType : "json"}).pipe(
      tap((e) => console.log(e))
    )
  }
  
}
