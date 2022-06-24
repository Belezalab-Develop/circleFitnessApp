import { AvatarService } from './../../../services/auxiliar/avatar.service';

import { CachingService } from './../../../services/auxiliar/caching.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { NavController, AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  users: any[];
  chats: any = [];
  workouts;
  latitude;
  longitude;
  allUser = [];
  userUid: any;
  testId: string;
  email: any;
  profile = null;
  perfil: any;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private storageService: CachingService,
    private avatarService: AvatarService,
    private loadingController: LoadingController,

  ) {
    this.getInitialLogicData();
    this.presentLoadingDefault();

  }

  ngOnInit() {
    console.log('This profile init:::', this.profile);
    this.getLocation();
  }
  ionViewDidEnter() {
    console.log('This profile Enter:::', this.profile);
    this.users = [
      {
        id: 0,
        first_name: 'Martin',
        last_name: 'Sanchez',
        avatar: '/assets/imgs/samples/man-user01.jpg',
        otr_info: '',
        total_new: 0,
      },
      {
        id: 0,
        first_name: 'Jonh',
        last_name: 'Snow2',
        avatar: '/assets/imgs/samples/man-user02.jpg',
        otr_info: '',
        total_new: 4,
      },
      {
        id: 0,
        first_name: 'Maria',
        last_name: 'Mar',
        avatar: '/assets/imgs/samples/man-user03.jpg',
        otr_info: '',
        total_new: 1,
      },
      {
        id: 0,
        first_name: 'Greta',
        last_name: 'will',
        avatar: '/assets/imgs/samples/woman-user01.jpg',
        otr_info: '',
        total_new: 0,
      },
      {
        id: 0,
        first_name: 'Yet',
        last_name: 'Smit',
        avatar: '/assets/imgs/samples/woman-user02.jpg',
        otr_info: '',
        total_new: 0,
      },
    ];
  }

  async getInitialLogicData() {

    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;
      this.avatarService.getUserProfile(this.userUid).subscribe((data) => {
        this.profile= data;
      });

    });

  }

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  openNutrition() {

  }

  goDetail() {

  }

  goChat(chat) {
    // this.router.navigateByUrl('/chat');

  }

  goFilter() {
    this.router.navigateByUrl('filters-chat');
  }


  async seePlans() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      message: `Sólo para suscritos`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ver Planes',
          handler: () => {
            this.router.navigate(['/subscriptions']);
          }
        }
      ]
    });
    await alert.present();
  }
  // geolocation

  async getLocation() {
    await Geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        if (resp) {
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
        }
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  async presentLoadingDefault() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'un momento por favor ....'


    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }

}
