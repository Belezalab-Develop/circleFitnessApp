import { CachingService } from './caching.service';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public accessToken: string;
  public user: any = {};

  constructor(
    public toastCtrl: ToastController,
    public storageService: CachingService,
  ) { }

  public async getKeyStorage(key: string): Promise<any> {
    try {
      const result = await this.storageService.getStorage(key).then(response => {
        if (response != null) {
          this.accessToken = response.access_token;
          return this.accessToken;
        }
        return null;
      });

    } catch (error) {
      console.log(error);
      return null;
    }
  }


  public async showToast(message: string, css: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      cssClass: css

    });
    toast.present();
  }
}
