import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let current_user = JSON.parse(localStorage.getItem('current_user'));
        if (current_user && current_user.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${current_user.token}`
                }
            });
        }

        return next.handle(request);
    }
}
