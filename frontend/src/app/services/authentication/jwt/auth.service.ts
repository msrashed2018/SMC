import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { JwtResponse } from './jwt-response';
import { LoginInfo } from './login-info';
import { SignupInfo } from './signup-info';
import { API_URL } from '../../../app.constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = API_URL+"/signin";
  private signupUrl = API_URL+"/signup";
 
  constructor(private http: HttpClient) {
  }
 
  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
 
  signUp(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
