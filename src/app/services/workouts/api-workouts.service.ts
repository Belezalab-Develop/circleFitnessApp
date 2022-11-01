import { from, Observable, of } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { CachingService } from './../auxiliar/caching.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Network } from '@capacitor/network';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkoutsService {
  connected = true;

  constructor(
    private http: HttpClient,
    private storageService: CachingService,
    private toastCtrl: ToastController
  ) {
    Network.addListener('networkStatusChange', async status => {
      this.connected = status.connected;
    });

    this.toastCtrl.create({ animated: false }).then(t => { t.present(); t.dismiss(); });
  }


  index(individual, forceRefresh: boolean) {
    const url=`${environment.apiUlr}/exercise-programs`;

    return this.getData(url, individual, forceRefresh).pipe(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      map(res => res['results'])
    );
    //return this.http.get(`${environment.apiUlr}/exercise-programs`);
  }

  individual(id) {
    return this.http.get(`${environment.apiUlr}/exercise-program/${id}`);
  }


  indexGoals(individual, forceRefresh: boolean) {
    const url = `${environment.apiUlr}/exercise-programs-goals`;
    return this.getData(url, individual, forceRefresh).pipe(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      map(res => res['results'])
    );
    //return this.http.get(`${environment.apiUlr}/exercise-programs-goals`);
  }
  indexSegments(individual, forceRefresh: boolean) {

    const url = `${environment.apiUlr}/exercise-programs-segments`;
    return this.getData(url, individual, forceRefresh).pipe(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      map(res => res['results'])
    );
    //return this.http.get(`${environment.apiUlr}/exercise-programs-segments`);
  }

  // Caching Functions

  private getData(url, individual, forceRefresh = false): Observable<any> {

    // Handle offline case
    if (!this.connected) {
      this.toastCtrl.create({
        message: 'You are viewing offline data.',
        duration: 2000
      }).then(toast => {
        toast.present();
      });
      return from(this.storageService.getCachedRequest(url, individual));
    }

    // Handle connected case
    if (forceRefresh) {
      // Make a new API call
      return this.callAndCache(url, individual);
    } else {
      // Check if we have cached data
      const storedValue = from(this.storageService.getCachedRequest(url, individual));
      return storedValue.pipe(
        switchMap(result => {
          if (!result) {
            // Perform a new request since we have no data
            return this.callAndCache(url, individual);
          } else {
            // Return cached data
            return of(result);
          }
        })
      );
    }
  }
  private callAndCache(url, individual ): Observable<any> {
    return this.http.get(url).pipe(
      tap(res => {
        // Store our new data
        this.storageService.cacheRequest(url, individual,  res);
      })
    );
  }


}
