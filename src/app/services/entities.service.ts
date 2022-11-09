import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  url = 'https://rcs-api-services-iffsq.ondigitalocean.app/api/entities';
  // url = 'http://127.0.0.1:8000/api/entities';

  constructor(private http: HttpClient) { }

  getAllEntities(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getEntities(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setEntities(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteEntities(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }


}
