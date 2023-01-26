import { Injectable, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';

import {
  AlertController,
  IonRouterOutlet,
  NavController,
  Platform,
  ToastController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  private lastTimeBackButtonWasPressed = 0;
  private timePeriodToAction = 2000;

  constructor(private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController,
    private location: Location
  ) { }

  init() {

    this.performBackButtonAction();

  }

  public performBackButtonAction() {
    if (this.platform.is('capacitor')) {
      this.platform.backButton.subscribeWithPriority(10, () => {
        if (!this.routerOutlet.canGoBack()) {
          this.withDoublePress('Press again to exit', () => {
            App.minimizeApp();
          });
        } else {
          this.location.back();
        }
      });
    }
  }

  async withDoublePress(message: string, action: () => void) {
    const currentTime = new Date().getTime();

    if (currentTime - this.lastTimeBackButtonWasPressed < this.timePeriodToAction) {
      action();
    } else {
      const toast = await this.toastController.create({
        message,
        duration: this.timePeriodToAction
      });

      await toast.present();

      this.lastTimeBackButtonWasPressed = currentTime;
    }
  }

  async withAlert(message: string, action: () => void) {
    const alert = await this.alertController.create({
      message,
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'OK',
        handler: action
      }]
    });

    await alert.present();
  }
}
