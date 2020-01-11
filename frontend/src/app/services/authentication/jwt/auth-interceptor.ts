import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorModalService } from '../../../views/error-modal/error-modal.service';



const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private router: Router, private token: TokenStorageService, private errorModalSserive: ErrorModalService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        // req.headers.set('Access-Control-Allow-Origin',`${CORS}`);
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        return next.handle(authReq).pipe(
            // tap(evt => {}),
            catchError(error => this.handleAuthError(error))
);
    }

    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if(error.error instanceof ErrorEvent){
            console.log('Client Side Error: '+ error.error.message)
        }
        if (error.status === 401 || error.status === 403) {
            //navigate /delete cookies or whateverz
            this.token.signOut();
            // this.router.navigate(['404']);
            this.router.navigate(['login']);
            //  location.reload(true);

            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            // return Observable.throw(error.message);
            // return throwError(error)
        }else if(error.status === 0){
            // this.router.navigate(['500']);
        }
        // console.error("Error",error);
        if(error.error != null ){
            this.errorModalSserive.error("ERROR",error.error.message);
        }else{
            this.errorModalSserive.error("ERROR","عفوا، حدث خطا، حاول مره أخرى");
        }
        return throwError(error)
    }

}
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
