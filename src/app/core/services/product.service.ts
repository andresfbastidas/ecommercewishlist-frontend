import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient) { }


  productList(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/product/findAllProducts`).pipe(
      map((response: any) => response),
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
