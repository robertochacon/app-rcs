import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {

  // url = 'https://api-rcs-lqtwb.ondigitalocean.app/api/deliverys';
  url = 'http://127.0.0.1:8000/api/shipments';

  constructor(private http: HttpClient) { }

  getAllShipments(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getShipments(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setShipments(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteShipments(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

}
