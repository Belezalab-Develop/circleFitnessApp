import { AvatarService } from './../../services/auxiliar/avatar.service';
import { AnalyticsService } from './../../services/analytics.service';
import { AuthenticationService } from './../../services/auxiliar/authentication.service';
import { CachingService } from './../../services/auxiliar/caching.service';
import { GeneralService } from './../../services/auxiliar/general.service';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Smartlook, SmartlookNavigationEvent, SmartlookUserIdentifier, SmartlookViewState } from '@awesome-cordova-plugins/smartlook/ngx';

import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.page.html',
  styleUrls: ['./home-auth.page.scss'],
})
export class HomeAuthPage implements OnInit {


  workoutListPage: any;
  user: any = {};
  enabled = this.analyticsService.analyticsEnabled;
  uid: any;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private generalService: GeneralService,
    private storageStervice: CachingService,
    private authService: AuthenticationService,
    private menuCtrl: MenuController,
    private analyticsService: AnalyticsService,
    private titleService: Title,
    private analitycs: AnalyticsService,
    private avatarService: AvatarService,
    private smartlook: Smartlook,
  ) {
    this.authService.authState.next(true);
    this.titleService.setTitle('INICIO - Circle Fitness');
    this.analitycs.setScreenName('INICIO - Circle Fitness');
    this.smartlook.trackNavigationEvent(new SmartlookNavigationEvent('INICIO - Circle Fitness', SmartlookViewState.START));

  }

  ngOnInit() {
    console.log('HomeAuthPage');
    this.menuCtrl.enable(true);

  }
  ionViewWillEnter() {
    console.log('ChildComponent==>ionViewWillEnter');
    this.getUser();
    this.avatarService.updateName(this.uid, this.user.nick_name);
    this.smartlook.setUserIdentifier(new SmartlookUserIdentifier(
      'user - identificacion',
      {
        name: this.user.nick_name,
        email: this.user.email,
        id: this.uid
      }
    ));
  }


  getUser(): void {
    this.storageStervice.getStorage('user').then((user) => {
      console.log(user);
      this.generalService.user = user;
      this.user = user;
      this.storageStervice.getStorage('user_uid').then(uid => {
        this.uid = uid;
      });

    });

  }

  goWorkoutRoutine(routines: any) {
    this.router.navigateByUrl('user-workout', { replaceUrl: true });
  }

  async goInfluencers() {

    this.router.navigateByUrl('influencer-list', { replaceUrl: true });
  }

  async goExploreWorkouts() {

    this.router.navigateByUrl('workouts-list', { replaceUrl: true });
  }

  async goExploreNutrition() {

    this.router.navigateByUrl('nutrition-list', { replaceUrl: true });
  }
  async goToChat() {
    await this.delay(1500);
    this.router.navigateByUrl('last-chats', {
      state: { last: 0 }
    });
  }

  goProfile() {
    this.router.navigateByUrl('profile-settings', { replaceUrl: true });
  }

  async goGalery() {
    this.router.navigateByUrl('user-galery');
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async crash(): Promise<void> {
    await FirebaseAnalytics.logEvent({
      name: 'crash_triggered',
      params: {
        method: 'test',
      }
    });
    await FirebaseCrashlytics.crash({ message: 'Test' });
  }


}
