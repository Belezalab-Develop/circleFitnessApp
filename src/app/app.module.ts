import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AppAvailability } from '@awesome-cordova-plugins/app-availability/ngx';
import { AuthProvider } from './providers/auth/auth';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { PipesModule } from './pipes/pipes.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';
import { AngularFireModule } from '@angular/fire/compat';


import { environment } from '../environments/environment.prod';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { IonicImageLoaderModule } from 'ionic-image-loader-v5';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { Smartlook} from '@awesome-cordova-plugins/smartlook/ngx';



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
    provideAuth(() =>  getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    IonicImageLoaderModule,
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
    Title,
    WebView,
    Smartlook,
    StatusBar,
    InAppBrowser,
    AppAvailability,
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
