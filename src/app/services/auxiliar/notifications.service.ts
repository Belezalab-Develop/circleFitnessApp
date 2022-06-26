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

  constructor(
    private platform: Platform,
    private router: Router,
    private http: HttpClient,
    private firebaseService: FirebaseService
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
      (token: Token) => {
        console.log('Push registration success, token: ', token.value);
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
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
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  /*  async guadarToken(token: any) {

     const uid = await this.firebaseService.getUid();

     if (uid) {
       console.log('guardar Token Firebase ->', uid);
       const path = '/Clientes/';
       const userUpdate = {
         token,
       };
       this.firestoreService.updateDoc(userUpdate, path, uid);
       console.log('guardar TokenFirebase()->', userUpdate, path, uid);
     }
   } */


}
