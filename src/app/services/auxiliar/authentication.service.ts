import { AvatarService } from 'src/app/services/auxiliar/avatar.service';
import { ApiInfluencersService } from './../influencers/api-influencers.service';
import { ApiNutritionService } from './../nutrition/api-nutrition.service';
import { ApiWorkoutsService } from './../workouts/api-workouts.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../user.service';
import { GeneralService } from './general.service';
import { CachingService } from './caching.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Platform, ToastController, LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { client, environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authState = new BehaviorSubject(false);
  constructor(
    public router: Router,
    private http: HttpClient,
    public storageService: CachingService,
    private platform: Platform,
    public toastController: ToastController,
    public generalService: GeneralService,
    private userService: UserService,
    private workoutService: ApiWorkoutsService,
    private nutritionService: ApiNutritionService,
    private influencerService: ApiInfluencersService,
    private avatarService: AvatarService,
    private storage: Storage,
    private loadingController: LoadingController,
  ) {

    this.platform.ready().then(async () => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storageService.getStorage('TOKEN_INFO').then(response => {
      // console.log(response);
      if (response) {
        this.authState.next(true);
      }
    });
  }

  loginEmail(credentials: any) {

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');

    const data = {
      client_secret: client.client_secret,
      client_id: client.client_id,
      username: credentials.email,
      password: credentials.password,
      grant_type: client.grant_type
    };

    return this.http.post(environment.apiAuth, data, { headers });
  }

  async saveStorageLogin(token: any) {

    this.storageService.setStorage('TOKEN_INFO', token).then(async response => {
      if (response) {
        this.authState.next(true);

        this.setUserStorage();
      }
    });
  }

  setUserStorage() {
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        if (user.has_completed_onboarding) {
          this.router.navigate(['/home-auth'], { replaceUrl: true });

        } else {
          this.router.navigate(['/wizard'], { replaceUrl: true });

        }
        this.cacheInfo();
        this.userInfo(user);

      }
    }, err => {
      console.log(err);
    });
  }

  async logout() {
    this.storageService.remove('user');
    this.storageService.remove('user_uid');
    this.storageService.clearCachedData();
    this.storageService.remove('TOKEN_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
    this.storageService.remove('users-around');
  }

  isAuthenticated() {
    return this.authState.value;
  }

  userInfo(user) {
    this.generalService.user = user;
    this.storageService.setStorage('user', user);
  }

  async cacheInfo() {
    console.log('cache info start:::');
    /*  const loading = await this.loadingController.create({
       spinner: 'bubbles',
       message: 'carregando as informações.'
     });
     loading.present(); */
    //TODO:: check si toda la informacion ya fue cargada en el storage
    this.avatarService.getUsersToWork().pipe(shareReplay()).subscribe(res => {
      this.storage.set('users-around', { res });
      //loading.dismiss();
    });
    this.workoutService.indexGoals('-work-goals', true).subscribe();
    this.workoutService.indexSegments('-work-segments', true).subscribe();
    this.nutritionService.indexConstraint('-nutri-constraint', true).subscribe();
    this.nutritionService.indexGoals('-nutri-goals', true).subscribe();
    this.nutritionService.indexSegments('-nutri-segments', true).subscribe();
    this.influencerService.index('-influencers', true).subscribe();


    console.log('cache info finish:::');

  }





}
