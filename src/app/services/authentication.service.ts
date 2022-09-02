import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = 'https://api-rcs-lqtwb.ondigitalocean.app/api/login';

  constructor(private http: HttpClient) { }

  login(identification: string, password: string): Observable<any>{
    const url = this.url;

    const credentials = {
      "cedula":identification,
      "password":password
    };

    return this.http.post(url,credentials);
  }

}
