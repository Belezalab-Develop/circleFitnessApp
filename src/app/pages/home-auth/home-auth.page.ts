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
  //TODO: trabajar en la logica de esta pagina

  workoutListPage: any;
  user: any = {};

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
  }

  ngOnInit() {
    console.log('HomeAuthPage');
    this.menuCtrl.enable(true);
    this.getUser();
  }

  getUser() {
    this.storageStervice.getStorage('user').then((user) => {

      this.generalService.user = user;
      this.user = user;
      console.log('user in Home', user);
    });
  }

  goWorkoutRoutine(routines: any) {
    this.router.navigateByUrl('user-workout');
  }

  goInfluencers() {
    this.router.navigateByUrl('influencer-list');
  }

  goExploreWorkouts() {
    this.router.navigateByUrl('workouts-list');
  }

  goExploreNutrition() {
    this.router.navigateByUrl('nutrition-list');
  }
  goToChat() {
    this.router.navigateByUrl('chats');
  }

  goProfile() {
    this.router.navigateByUrl('profile-settings');
  }

}
