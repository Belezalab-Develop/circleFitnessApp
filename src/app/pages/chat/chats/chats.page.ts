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
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit, OnDestroy {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  destroy$ = new Subject<void>();
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





    //this.presentLoadingDefault();
  }

  flattenDoc(res) {
    return { id: res.id, };
  }

  async ngOnInit() {

    this.getInitialLogicData();

  }

  async getInitialLogicData() {

    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;
      this.getProfile();
      this.getLastChats();


    });


  }
  async getProfile() {
    this.avatarService.getUserProfile(this.userUid).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.profile = data;
      console.log('el perfil->>', this.profile);
    });
  }

  async getLastChats() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'
    });
    loading.present();
    this.avatarService.getEspecificChats(this.userUid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.lastChats = response.map(item => item.img === 'undefined' ? { ...item, img: '', } : item);
        console.log(this.lastChats);
        this.isLoaded = false;
        loading.dismiss();

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
      this.nutritionService.individual(user.toNutritionId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(async (res) => {
          const nutritionProgram = res[0];
          await this.router.navigateByUrl('nutrition-details', {
            state: { showMoreOptions: false, nutritionProgram },
          });

          loading.dismiss();
        });
    }

    if (user.nutrition_id === 0) {
      loading.dismiss();
      this.errorAlert('Este partner não tem um programa de nutrição selecionado');
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
        .pipe(takeUntil(this.destroy$))
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
      this.errorAlert('este partner não tem treino selecionado');
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

  ngOnDestroy(): void {
    console.log('chats actives destroy');

    this.destroy$.next();
    this.destroy$.complete();


    this.storageService.remove('users-around');
    this.avatarService.getUsersToWork().subscribe(res => {
      this.storage.set('users-around', { res });
    });
  }

}
