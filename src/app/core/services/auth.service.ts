import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from '../models/login-request';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient) { }

  login(loginRequest:LoginRequest): Observable<any> {
    const allRequest: any = {
      username: loginRequest.username,
      password: loginRequest.password
  }
  return this.httpClient.post<any>(`${this.urlEndPoint}/user/authenticate`, allRequest).pipe(
    map((response: any) => response),
    catchError(error => {
      return throwError(() => error);
    })
);
  }

  public getUser(): string | null {
    return window.sessionStorage.getItem("auth-user");
  }

}
