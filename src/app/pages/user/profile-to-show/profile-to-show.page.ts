/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppAvailability } from '@awesome-cordova-plugins/app-availability/ngx';
import { InAppBrowser, InAppBrowserObject } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { ApiNutritionService } from 'src/app/services/nutrition/api-nutrition.service';
import { UserService } from 'src/app/services/user.service';
import { ApiWorkoutsService } from 'src/app/services/workouts/api-workouts.service';

@Component({
  selector: 'app-profile-to-show',
  templateUrl: './profile-to-show.page.html',
  styleUrls: ['./profile-to-show.page.scss'],
})
export class ProfileToShowPage implements OnInit {

  email: string;
  custom_url: string;
  user: any;
  userImageUrl: string;
  nutritionProgram;
  exerciseProgram;
  showMore = false;
  showAge;
  showGoals;

  constructor(
    private router: Router,
    public platform: Platform,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,
    private userService: UserService,
    private workOutService: ApiWorkoutsService,
    private nutritionService: ApiNutritionService
  ) {
    if (this.router.getCurrentNavigation() != null) {
      this.email = this.router.getCurrentNavigation().extras.state.email;
      this.userImageUrl = this.router.getCurrentNavigation().extras.state.photo_url;
      this.user = this.router.getCurrentNavigation().extras.state.user;
      this. ageCalculator();
      this.goalsSplit();
    }

  }

  ngOnInit() {
  }

  ageCalculator(){
    if(this.user.personal_information.birthday){
      const convertAge = new Date(this.user.personal_information.birthday);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

    }
  }

  goalsSplit(){
    if(this.user.personal_information.goals){
      const textSplit = this.user.personal_information.goals.split('_');
      console.log(textSplit);
      this.showGoals = textSplit;
    }
  }


  openInstagram(): void {
    let app;

    if (this.platform.is('ios')) {
      app = 'instagram://';
    } else if (this.platform.is('android')) {
      app = 'com.instagram.android';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.instagram.com/' + this.user.personal_information.instagram);
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available');
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('instagram://user?username=' + this.user.personal_information.instagram, '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.instagram.com/' + this.user.personal_information.instagram, '_system');
        }
      );
  }

}
