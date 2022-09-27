import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'http://127.0.0.1:8000/api/home';

  constructor(private http: HttpClient) { }

  getAllInfo(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

}
