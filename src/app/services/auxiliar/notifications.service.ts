import { BehaviorSubject } from 'rxjs';
import { AvatarService } from './avatar.service';
import { CachingService } from './caching.service';
import { FirebaseService } from './firebase.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public badge$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private platform: Platform,
    private router: Router,
    private http: HttpClient,
    private firebaseService: FirebaseService,
    private storageService: CachingService,
    private avatarService: AvatarService,
  ) { }

  inicializar() {

    if (this.platform.is('capacitor')) {
      PushNotifications.requestPermissions().then(result => {
        console.log(' Pidiendo permisos para el push');
        if (result.receive === 'granted') {
          PushNotifications.register();
          this.addListeners();

        }
      });
    } else {
      console.log('Push Notification no es movil');
    }
  }

  addListeners() {


    PushNotifications.addListener('registration',
      async (token: Token) => {
        console.log('Push registration success, token: ', token.value);
        //alert('Push registration success, token: ' + token.value);
        await this.guadarToken(token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        //alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
       // alert('Push received: ' + JSON.stringify(notification));
       this.badge$.next(true);
        LocalNotifications.schedule({
          notifications: [
            {
              title: notification.title,
              body: notification.body,
              id: 1,
              extra: {
                data: notification.data
              }
            }
          ]
        });
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
  async guadarToken(token: any) {

    console.log('SE EJECUTO LA FUNCION DE GUARDAR TOKEN:::');
    await this.storageService.getStorage('user_uid').then(res => {
      if (res) {
        console.log('guardar Token Firebase ->', res);

        const userUpdate = {
          token,
        };
        this.avatarService.updateToken(res, userUpdate.token);
        console.log('guardar TokenFirebase()->', userUpdate, res);
      } else {
        console.log('NO LO TIENE::: GUARDAR TOKEN EN EL STORAGE::');
        this.storageService.setStorage('push_token', token).then(response => {
          console.log('GUARDADO TOKEN EN STORAGE');
        });
      }

    });


  }


}
