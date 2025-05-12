import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertifyService } from '../servives/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class httpErrorInterceptorInterceptor implements HttpInterceptor {

  errorMessage!: any;

  constructor(private alertify: AlertifyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('HTTP Request started');
    return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {
               this.errorMessage = this.setError(error);
                //this.alertify.error(this.errorMessage);
                this.alertify.error("Il y a une erreur a corriger");
                return throwError(this.errorMessage);
            })
        );
  }


  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if(error.error instanceof ErrorEvent) {
        // Client side error
        errorMessage = error.error.message;
    } else {
        // server side error
        if (error.status!==0) {
            errorMessage = error.message;
        }
    }
    return errorMessage;
}

}


