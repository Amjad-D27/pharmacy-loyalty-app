
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private backend_Url = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(pharmacyData: any): Observable<any> {
    return this.http.post(`${this.backend_Url}/register`, pharmacyData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.backend_Url}/login`, loginData);
  }

}
