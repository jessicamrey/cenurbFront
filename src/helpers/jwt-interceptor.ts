
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if ((currentUser && currentUser.access_token)) {
     if (!request.headers.has("Authorization")){

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.access_token}`
          }
        });
      }
    }
    return next.handle(request);
  }
}