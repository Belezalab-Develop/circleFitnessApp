import { CachingService } from './../services/auxiliar/caching.service';
import { GeneralService } from './../services/auxiliar/general.service';


import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    Router
} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    token: string;
    constructor(
        private router: Router,
        public toastController: ToastController,
        public generalService: GeneralService,
        private storageService: CachingService,) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storageService.getStorage('TOKEN_INFO'))
            .pipe(
                switchMap(response => {
                    const token = response === null ? null : response.access_token;

                    if (token) {
                        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
                    }

                    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });


                    return next.handle(request).pipe(
                        map((event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                                // do nothing for now
                            }
                            return event;
                        }),
                        catchError((error: HttpErrorResponse) => {
                            if (error.status === 401) {
                                if (error.error.success === false) {
                                    // this.presentToast('Login failed');
                                } else {
                                    // this.router.navigate(['login']);
                                    // this.presentToast('Login failed');
                                }
                            }
                            return throwError(error);
                        })
                    );
                })
            );
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }
}
