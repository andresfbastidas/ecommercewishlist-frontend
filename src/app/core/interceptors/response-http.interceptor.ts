import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, throwError, catchError, lastValueFrom, firstValueFrom} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { DialogComponent } from 'src/app/components/notification/dialog.component';


@Injectable()
export class ResponseHttp implements HttpInterceptor {
  calls = 0; // handle more that one call and hide loader at last call
  cachedRequest!: Promise<any>;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly loaderService: LoaderService,
    private readonly dialog: DialogComponent
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.inter(req, next));
  }// intercept

  async inter(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<Event>> {
    this.calls;
    const result = lastValueFrom(next.handle(req));

    result.finally(() => {
      --this.calls;
      if (this.calls === 0) {
        this.loaderService.hide();
      }
    });

    return result.catch(async (err) => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
        return err;
      }
    })

  }

}