import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../servives/auth.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class appHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<unknown>> {

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (!req.url.includes("/api/login")) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '+this.authService.accessToken)
      });
  
      // send cloned request with header to the next handler.
      return next.handle(authReq).pipe(
        catchError(err => {
          if (err.status == 401) {
            this.authService.logout();
          }
          return throwError(err.message)
        })
      );
    } else {
      return next.handle(req);
    }
   
  }
}