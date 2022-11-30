import { ApiNutritionService } from './../../../services/nutrition/api-nutrition.service';
import { WorkoutListParams } from 'src/app/models/workoutlistparams';
import { ApiWorkoutsService } from './../../../services/workouts/api-workouts.service';
/* eslint-disable max-len */
import { InAppBrowserObject } from '@awesome-cordova-plugins/in-app-browser/ngx';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../../../services/user.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AppAvailability } from '@awesome-cordova-plugins/app-availability/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email: string;
  custom_url: string;
  user: any;
  userImageUrl: string;
  nutritionProgram;
  exerciseProgram;
  showAge;
  uid: string;

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
      this.uid = this.router.getCurrentNavigation().extras.state.uid;
      console.log('la imagen', this.userImageUrl);
    }

    this.userService.getIndividualUser(this.email).subscribe((data) => {
      this.user = data[0];
      console.log(this.user);
      if (this.user) {
        this.workOutService.individual(this.user.customer.exercise_program.exercise_program_id).subscribe((resp) => {
          this.exerciseProgram = resp[0];

        });

        this.nutritionService.individual(this.user.customer.nutrition_program.nutrition_program_id).subscribe((res)=> {
          this.nutritionProgram = res[0];

        });
      }
    });




  }

  ngOnInit() {
    this.custom_url = 'https://instagram.com/';
    console.log('user-detail-page');
  }

  async openDetailWorkout(workout: any) {
    const params = new WorkoutListParams();
    params.ShowSubList = true;
    params.ShowLocation = false;

    await this.router.navigate(['/workout-details'], {
      queryParams: { params, workout },
    });
  }

  async openNutrition(nutritionProgram): Promise<void> {
    await this.router.navigateByUrl('nutrition-details', {
      state: { showMoreOptions: false, nutritionProgram },
    });
  }

  async goUserLifeStyle(user, email, photo_url, uid){
    await this.router.navigateByUrl('profile-to-show', {
      state: { showMoreOptions: false, user , email, photo_url, uid},
    });
  }

  async goUserGalery(user, email, photo_url, uid){
    await this.router.navigateByUrl('galery-to-show', {
      state: { showMoreOptions: false, user , email, photo_url, uid},
    });
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
