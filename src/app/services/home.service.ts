import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'http://134.209.77.94/api/home';
  // url = 'http://127.0.0.1:8000/api/home';

  constructor(private http: HttpClient) { }

  getAllInfo(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  getAllInfoByEntity(entidad: any): Observable<any>{
    const url = this.url+'/entity/'+entidad;
    return this.http.get(url);
  }

}
