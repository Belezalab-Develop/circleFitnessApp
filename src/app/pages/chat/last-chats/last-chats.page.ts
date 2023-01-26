/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { shareReplay } from 'rxjs/operators';
import { AvatarService, User } from 'src/app/services/auxiliar/avatar.service';
import { CachingService } from 'src/app/services/auxiliar/caching.service';
import { ApiNutritionService } from 'src/app/services/nutrition/api-nutrition.service';
import { UserService } from 'src/app/services/user.service';
import { ApiWorkoutsService } from 'src/app/services/workouts/api-workouts.service';
import { Geolocation } from '@capacitor/geolocation';
import { WorkoutListParams } from 'src/app/models/workoutlistparams';

@Component({
  selector: 'app-last-chats',
  templateUrl: './last-chats.page.html',
  styleUrls: ['./last-chats.page.scss'],
})
export class LastChatsPage implements OnInit {

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
  ) {

    this.titleService.setTitle('User And Patners ');

    this.getInitialLogicData();
  }

  ngOnInit() {
  }

  async getInitialLogicData() {

    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;
      this.getProfile();
      this.getUsers();
      this.getLocation();

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

  openEspecificWorkout(email: string) {

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
    console.log('el email->>', toEmail);
    const badge = 0;
    this.avatarService.updateRecivedMessage(oUdi, badge);
    sessionStorage.setItem('uid', this.userUid);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('fromName', this.profile.name);
    sessionStorage.setItem('imagen', imageUrl);
    sessionStorage.setItem('oUid', oUdi);
    sessionStorage.setItem('toEmail', toEmail);
    this.router.navigateByUrl('/chat');

  }

  goSpecificChat(name, oUdi, imageUrl, messageSent, toEmail) {
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
    this.router.navigateByUrl('/chat');


  }

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
          }));

          const k = this.usersAround.sort((a, b) => a.distance - b.distance);

          console.log('users:::', this.users);

          console.log('users around:::', k);



          if (this.usersAround.length > 0) {
            this.isLoaded = false;
            loading.dismiss();
          } else {
            this.isLoaded = true;
            loading.dismiss();
            const msg = 'Ocorreu um problema ao carregar os dados, tente novamente em alguns instantes';
            this.errorAlert(msg);
            this.router.navigateByUrl('home-auth');
          }


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
    if (dis >= 0 ) {
      return Math.trunc(dis);
    }
    return 99999999999999999;
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
