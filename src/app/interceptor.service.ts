import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");
    if (token) {
      if (!(request.url.endsWith("verifyOTP") || request.url.endsWith("signup") || request.url.endsWith("getOrderId"))) {
        request = request.clone({
          setHeaders: {
            Authorization: token,
          },
        });
      }
    }

    // //alert(request.url+" "+request.headers.get("Authorization"));

    return next.handle(request);
  }
}
