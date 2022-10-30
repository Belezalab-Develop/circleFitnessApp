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
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  users: User[] = [];
  chats: any = [];
  chatsUser: any;
  latitude;
  longitude;
  allUser = [];
  userUid: any;
  testId: string;

  lastChats: any= [];

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
    this.getInitialLogicData();
    this.titleService.setTitle('All Chats');
    //this.presentLoadingDefault();
  }

  flattenDoc(res) {
    return { id: res.id, };
  }

  ngOnInit() {
    console.log('This profile init:::', this.profile);
    this.getLocation();
  }
  ionViewDidEnter() {
    console.log('This profile Enter:::', this.profile);

  }

  async getInitialLogicData() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'un momento por favor ....'


    });

    loading.present();
    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;
      this.avatarService.getUserProfile(this.userUid).subscribe((data) => {
        this.profile = data;
         this.avatarService.getEspecificChats(this.userUid).subscribe(response =>{
          this.lastChats = response;
        console.log('esto es algo ', this.lastChats);
       });
        this.getUsers();
        loading.dismiss();
      });


    });


  }
  async getUsers() {
    this.avatarService.getUsers().subscribe(res => {
      this.users = res.filter(item => item.id !== this.userUid);

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

  goChat(name, oUdi, imageUrl) {
    const badge = 0;

    this.avatarService.updateRecivedMessage(oUdi, badge);
    sessionStorage.setItem('uid', this.userUid);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('imagen', imageUrl);
    sessionStorage.setItem('oUid', oUdi);
    this.router.navigateByUrl('/chat');


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
