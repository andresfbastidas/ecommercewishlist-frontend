import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WishListRequest } from '../models/wish-list-request';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private readonly urlEndPoint: string = environment.backendBasePath;
  constructor(private readonly httpClient: HttpClient) { }

  productWishList(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlEndPoint}/wishList/allProductsWishList`).pipe(
      map((response: any) => response),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  addProduct(addWishListRequest:WishListRequest): Observable<any> {
    const allRequest: any = {
      idProduct: addWishListRequest.idProduct,
      userName: addWishListRequest.userName
  }
  return this.httpClient.post<any>(`${this.urlEndPoint}/wishList/addProductWishList`, allRequest).pipe(
    map((response: any) => response),
    catchError(error => {
      return throwError(() => error);
    })
);
  }

  deleteProductWishList(wishListRequest:WishListRequest): Observable<any> {
    const allRequest: any = {
      idProduct: wishListRequest.idProduct,
      userName: wishListRequest.userName
  }
  return this.httpClient.post<any>(`${this.urlEndPoint}/wishList/deleteProductById`, allRequest).pipe(
    map((response: any) => response),
    catchError(error => {
      return throwError(() => error);
    })
);
  }
}
