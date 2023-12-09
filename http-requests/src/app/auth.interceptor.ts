import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url);
    
    const modifiedRequest = request.clone(
      {
        headers: request.headers.append('Auth', 'xyz')
      }
    )
    console.log('request is on its way');
    
    return next.handle(modifiedRequest).pipe(
      tap(event => {
        console.log(event)
        if(event.type === HttpEventType.Response){
          console.log("Response arrived, body data:");
          console.log(event.body);
          
          
        }
      })
    );
  }
}
