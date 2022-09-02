import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  url = 'https://api-rcs-lqtwb.ondigitalocean.app/api/documents';

  constructor(private http: HttpClient) { }

  getDocuments(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setDocuments(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

}
