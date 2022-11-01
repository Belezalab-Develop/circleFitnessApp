import { Title } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AvatarService, User } from './../../../services/auxiliar/avatar.service';

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
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  users: User[] = [];
  us: any;
  chats: any = [];
  chatsUser: any;
  latitude;
  longitude;
  allUser = [];
  userUid: any;
  testId: string;

  lastChats: any = [];
  geoUsers: any = [];
  profile = null;




  constructor(
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private storageService: CachingService,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private afs: AngularFirestore,
    private titleService: Title,


  ) {
    this.titleService.setTitle('All Chats');

    //this.presentLoadingDefault();
  }

  flattenDoc(res) {
    return { id: res.id, };
  }

  ngOnInit() {


  }
  ionViewDidEnter() {
    this.getLocation();
    this.getInitialLogicData();
  }

  async getInitialLogicData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'un momento por favor ....'
    });

    loading.present();
    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;
      this.getProfile();
      this.getLastChats();
      this.getUsers();
      loading.dismiss();
    });


  }
  async getUsers() {
    this.avatarService.getUsers().subscribe(res => {
      this.users = res.filter(item => item.id !== this.userUid);

    });
  }
  async getProfile() {
    this.avatarService.getUserProfile(this.userUid).subscribe((data) => {
      this.profile = data;
      console.log('el perfil->>', this.profile );
    });
  }

  async getLastChats() {
    this.avatarService.getEspecificChats(this.userUid).subscribe(response => {
      this.lastChats = response;

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

  goDetail(email: string, photo_url: string) {
    this.router.navigateByUrl('/profile', {replaceUrl: true, state: {
      email,
      photo_url
    }});
  }

  goChat(name, oUdi, imageUrl) {
    const badge = 0;
    this.avatarService.updateRecivedMessage(oUdi, badge);
    sessionStorage.setItem('uid', this.userUid);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('fromName', this.profile.name);
    sessionStorage.setItem('imagen', imageUrl);
    sessionStorage.setItem('oUid', oUdi);
    this.router.navigateByUrl('/chat', {replaceUrl: true});

  }

  goSpecificChat(name, oUdi, imageUrl, messageSent, espToUid) {
    const badge = 0;

    if (messageSent === 1 ) {
      this.avatarService.updateSpecificMessajeSent(this.userUid, oUdi, badge);
    }

    sessionStorage.setItem('uid', this.userUid);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('fromName', this.profile.name);
    sessionStorage.setItem('imagen', imageUrl);
    sessionStorage.setItem('oUid', oUdi);
    this.router.navigateByUrl('/chat', {replaceUrl: true});


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
        if (resp) {
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
          const result = this.avatarService.updatePosition(this.userUid, this.latitude, this.longitude);

          this.users.map((us) => {

            us.distance = this.calculateDistance(this.longitude, us.long, this.latitude, us.lat);

            this.geoUsers.push(us);
          });
          console.log('users luego del mapGeo--->', this.geoUsers);
        }
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  calculateDistance(lon1, lon2, lat1, lat2) {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((lon1 - lon2) * p))) / 2;
    const dis = (12742 * Math.asin(Math.sqrt(a)));
    return Math.trunc(dis);
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
