import { WorkoutListParams } from 'src/app/models/workoutlistparams';
import { ApiNutritionService } from './../../../services/nutrition/api-nutrition.service';
import { ApiWorkoutsService } from './../../../services/workouts/api-workouts.service';
import { UserService } from './../../../services/user.service';
import { Title } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AvatarService, User } from './../../../services/auxiliar/avatar.service';

import { CachingService } from './../../../services/auxiliar/caching.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { NavController, AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
/* import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Auth, user } from '@angular/fire/auth'; */
import { shareReplay } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

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

  usersAround: any = [];

  espUser;
  nutritionProgram;
  exerciseProgram;
  isLoaded = true;




  constructor(
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private storageService: CachingService,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private afs: AngularFirestore,
    private titleService: Title,
    private userService: UserService,
    private workOutService: ApiWorkoutsService,
    private nutritionService: ApiNutritionService,
    private alertController: AlertController,
    private storage: Storage,


  ) {
    this.titleService.setTitle('All Chats');

    this.getInitialLogicData();



    //this.presentLoadingDefault();
  }

  flattenDoc(res) {
    return { id: res.id, };
  }

  ngOnInit() { }

  async getInitialLogicData() {

    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;
      this.getProfile();
      this.getLastChats();
    /*   this.getUsers();
      this.getLocation(); */

    });


  }
  async getUsers() {
    this.avatarService.getUsers().pipe(shareReplay()).subscribe(res => {
      this.users = res.filter(item => item.id !== this.userUid)
        .map(item => item.imageUrl === 'undefined' ? { ...item, imageUrl: '', } : item);

    });
  }
  async getProfile() {
    this.avatarService.getUserProfile(this.userUid).pipe(shareReplay()).subscribe((data) => {
      this.profile = data;
      console.log('el perfil->>', this.profile);
    });
  }

  async getLastChats() {
    this.avatarService.getEspecificChats(this.userUid).pipe(
      shareReplay()
    ).subscribe(response => {
      this.lastChats = response.map(item => item.img === 'undefined' ? { ...item, img: '', } : item);
      console.log(this.lastChats);

    });
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    //this.segment = k;
  }

  async openEspecificNutrition(user) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'
    });
    loading.present();

    if (user.toNutritionId !== 0) {
      this.nutritionService.individual(user.toNutritionId).subscribe(async (res) => {
        const nutritionProgram = res[0];
        await this.router.navigateByUrl('nutrition-details', {
          state: { showMoreOptions: false, nutritionProgram },
        });

        loading.dismiss();
      });
    }

    if (user.nutrition_id === 0) {
      loading.dismiss();
      this.errorAlert('Este parceiro não tem um programa de nutrição selecionado');
    }

  }

  async openEspecificWorkout(user) {

    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'
    });
    loading.present();
    console.log(user);
    if (user.toWorkoutId !== 0) {
      this.workOutService.individual(user.toWorkoutId)
        .subscribe(async (resp) => {
          console.log(resp);
          const workout = resp[0];

          const params = new WorkoutListParams();
          params.ShowSubList = true;
          params.ShowLocation = false;

          await this.router.navigate(['/workout-details'], {
            queryParams: { params, workout },
          });
          loading.dismiss();
        }
          , err => {
            console.log(err);
          });
    }
    if (user.workout_id === 0) {
      loading.dismiss();
      this.errorAlert('este parceiro não tem treino selecionado');
    }

  }


  goDetail(email: string, photo_url: string, uid: string, workout_id: number, nutrition_id: number) {
    this.router.navigateByUrl('/profile', {
      replaceUrl: true, state: {
        email,
        photo_url,
        uid,
        workout_id,
        nutrition_id
      }
    });
  }



  goSpecificChat(name, oUdi, imageUrl, messageSent, toEmail, toWorkoutId, toNutritionId) {
    const badge = 0;
    console.log('el email->>', toEmail);

    if (messageSent === 1) {
      this.avatarService.updateSpecificMessajeSent(this.userUid, oUdi, badge);
    }

    sessionStorage.setItem('uid', this.userUid);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('fromName', this.profile.name);
    sessionStorage.setItem('imagen', imageUrl);
    sessionStorage.setItem('oUid', oUdi);
    sessionStorage.setItem('toEmail', toEmail);
    sessionStorage.setItem('toWorkoutId', toWorkoutId);
    sessionStorage.setItem('toNutritionId', toNutritionId);
    this.router.navigateByUrl('/chat');


  }

  goFilter() {
    this.router.navigateByUrl('filters-chat');
  }

  goToGymPartners() {
    this.router.navigateByUrl('/last-chats');
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
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'
    });


    loading.present();
    await Geolocation
      .getCurrentPosition()
      .then((resp) => {
        if (resp) {
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
          const result = this.avatarService.updatePosition(this.userUid, this.latitude, this.longitude);

          this.usersAround = this.users.map(item => ({
            ...item,
            distance: this.calculateDistance(this.longitude, item.long, this.latitude, item.lat)
          })).sort((a, b) => a.distance - b.distance);

          const k = this.usersAround;

          console.log('users:::', this.users);

          console.log('users around:::', k);

          loading.dismiss();

          this.isLoaded = false;
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

  isNumber(value) {
    return Number.isNaN(value);
  }

  async presentLoadingDefault() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'


    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }

  async errorAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops!!',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
