import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  // url = 'https://api-rcs-lqtwb.ondigitalocean.app/api/documents';
  url = 'http://127.0.0.1:8000/api/documents';

  constructor(private http: HttpClient) { }

  getAllDocuments(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getAllDocumentsByEntity(entidad: any): Observable<any>{
    const url = this.url+'/entity/'+entidad;
    return this.http.get(url);
  }

  getDocuments(identification: string): Observable<any>{
    const url = this.url+'/'+identification;
    return this.http.get(url);
  }

  setDocuments(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteDocuments(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

}
