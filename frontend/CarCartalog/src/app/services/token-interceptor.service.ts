import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private api: AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.api.getToken();
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    }
    return next.handle(request).pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message)
    }
    else {
      console.error(`${error.status},` +
        `Erro: ${JSON.stringify(error.error)}`
      )
    }
    return throwError('ocorreu um erro, tente novamente')
  }

}
