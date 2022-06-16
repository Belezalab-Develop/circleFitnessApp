import { AnalyticsService } from './../../services/analytics.service';
import { AuthenticationService } from './../../services/auxiliar/authentication.service';
import { CachingService } from './../../services/auxiliar/caching.service';
import { GeneralService } from './../../services/auxiliar/general.service';

import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.page.html',
  styleUrls: ['./home-auth.page.scss'],
})
export class HomeAuthPage implements OnInit {


  workoutListPage: any;
  user: any = {};
  enabled = this.analyticsService.analyticsEnabled;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private generalService: GeneralService,
    private storageStervice: CachingService,
    private authService: AuthenticationService,
    private menuCtrl: MenuController,
    private analyticsService: AnalyticsService
  ) {
    this.authService.authState.next(true);
    this.getUser();
  }

  ngOnInit() {
    console.log('HomeAuthPage');
    this.menuCtrl.enable(true);
    this.getUser();
  }

  getUser() {
    this.storageStervice.getStorage('user').then((user) => {
      console.log(user);
      this.generalService.user = user;
      this.user = user;

    });
    ;
  }

  goWorkoutRoutine(routines: any) {
    this.router.navigateByUrl('user-workout', {replaceUrl: true});
  }

  goInfluencers() {
    this.router.navigateByUrl('influencer-list', {replaceUrl: true});
  }

  goExploreWorkouts() {
    this.router.navigateByUrl('workouts-list', {replaceUrl: true});
  }

  goExploreNutrition() {
    this.router.navigateByUrl('nutrition-list', {replaceUrl: true});
  }
  goToChat() {
    this.router.navigateByUrl('chats', {replaceUrl: true});
  }

  goProfile() {
    this.router.navigateByUrl('profile-settings', {replaceUrl: true});
  }

}
