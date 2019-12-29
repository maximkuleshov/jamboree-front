import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("ACCESS_TOKEN");
        let cloned = req;

        if (idToken) {
            cloned = req.clone({
                headers: req.headers
                    .set("Authorization", "Bearer " + idToken)
            });
        }

        return next.handle(cloned).pipe(catchError(err => {
            // onError

            if (!req.url.endsWith("/api/auth") && err instanceof HttpErrorResponse && err.status === 401) {
                window.location.href = "/login";
            }

            return throwError(err);
        }));
    }
}