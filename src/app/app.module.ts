import { AuthProvider } from './providers/auth/auth';
import { Capacitor } from '@capacitor/core';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PipesModule } from './pipes/pipes.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment.prod';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    //AngularFireAuthModule,
    //AngularFirestoreModule,
    provideAuth(() =>  getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

    PipesModule,
    IonicStorageModule.forRoot({
      // eslint-disable-next-line no-underscore-dangle
      name: 'circlefitnessdb',
      // eslint-disable-next-line no-underscore-dangle
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })

  ],
  exports:[
    PipesModule,
  ],
  providers: [,
    AuthProvider,
    StatusBar,
    { provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
