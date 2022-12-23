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
import { shareReplay } from 'rxjs/operators';

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

  espUser;
  nutritionProgram;
  exerciseProgram;




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
    private nutritionService: ApiNutritionService


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
      message: 'carregando as informações.'
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
    this.avatarService.getUsers().pipe(shareReplay()).subscribe(res => {
      this.users = res.filter(item => item.id !== this.userUid);

    });
  }
  async getProfile() {
    this.avatarService.getUserProfile(this.userUid).pipe(shareReplay()).subscribe((data) => {
      this.profile = data;
      console.log('el perfil->>', this.profile);
    });
  }

  async getLastChats() {
    this.avatarService.getEspecificChats(this.userUid).pipe(shareReplay()).subscribe(response => {
      this.lastChats = response;

    });
  }

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  async openEspecificNutrition(email) {

    this.userService.getIndividualUser(email).subscribe(async (data) => {
      this.espUser = data[0];
      if (this.espUser) {

        this.nutritionService.individual(this.espUser.customer.nutrition_program.nutrition_program_id).subscribe(async (res) => {
          const nutritionProgram = res[0];
          await this.router.navigateByUrl('nutrition-details', {
            state: { showMoreOptions: false, nutritionProgram },
          });
        });


      }
    });

  }

  openEspecificWorkout(email) {

    this.userService.getIndividualUser(email).subscribe((data) => {
      this.espUser = data[0];
      if (this.espUser) {
        this.workOutService.individual(this.espUser.customer.exercise_program.exercise_program_id).subscribe(async (resp) => {
          const workout = resp[0];

          const params = new WorkoutListParams();
          params.ShowSubList = true;
          params.ShowLocation = false;

          await this.router.navigate(['/workout-details'], {
            queryParams: { params, workout },
          });
        });
      }
    });

  }

  goDetail(email: string, photo_url: string, uid: string) {
    this.router.navigateByUrl('/profile', {
      replaceUrl: true, state: {
        email,
        photo_url,
        uid
      }
    });
  }

  goChat(name, oUdi, imageUrl, toEmail) {
    console.log('el email->>',toEmail);
    const badge = 0;
    this.avatarService.updateRecivedMessage(oUdi, badge);
    sessionStorage.setItem('uid', this.userUid);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('fromName', this.profile.name);
    sessionStorage.setItem('imagen', imageUrl);
    sessionStorage.setItem('oUid', oUdi);
    sessionStorage.setItem('toEmail', toEmail);
    this.router.navigateByUrl('/chat', { replaceUrl: true });

  }

  goSpecificChat(name, oUdi, imageUrl, messageSent, toEmail) {
    const badge = 0;
    console.log('el email->>',toEmail);

    if (messageSent === 1) {
      this.avatarService.updateSpecificMessajeSent(this.userUid, oUdi, badge);
    }

    sessionStorage.setItem('uid', this.userUid);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('fromName', this.profile.name);
    sessionStorage.setItem('imagen', imageUrl);
    sessionStorage.setItem('oUid', oUdi);
    sessionStorage.setItem('toEmail', toEmail);
    this.router.navigateByUrl('/chat', { replaceUrl: true });


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
      message: 'carregando as informações.'


    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }

}
