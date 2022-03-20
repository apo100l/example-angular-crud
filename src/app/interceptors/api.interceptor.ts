import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  static getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.startsWith(`${environment.apiUrl}`);
    if (isApiUrl) {
      return next.handle(
        request.clone({
          headers: ApiInterceptor.getHeaders(),
        }),
      );
    }
    return next.handle(request);
  }
}
