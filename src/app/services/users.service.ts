import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // url = 'https://api-rcs-lqtwb.ondigitalocean.app/api/deliverys';
  url = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setUsers(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteUsers(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }


}
