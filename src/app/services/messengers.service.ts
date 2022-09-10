import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengersService {

  url = 'https://api-rcs-lqtwb.ondigitalocean.app/api/deliverys';

  constructor(private http: HttpClient) { }

  getAllMessengers(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getMessengers(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setMessengers(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

}