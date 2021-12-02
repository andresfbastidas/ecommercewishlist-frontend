import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private data = new BehaviorSubject([]);
  castUser = this.data.asObservable();
  constructor() { }

  public updateDataAuthService(newData:any): void {
    this.data.next(newData); 
  }
}
