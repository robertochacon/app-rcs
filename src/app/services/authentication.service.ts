import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // url = 'https://api-rcs-lqtwb.ondigitalocean.app/api/login';
  url = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) { }

  login(identification: string, password: string): Observable<any>{
    const url = this.url;

    const credentials = {
      "identification":identification,
      "password":password
    };

    return this.http.post(url,credentials);
  }

}
