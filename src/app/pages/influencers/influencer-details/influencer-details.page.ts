import { InAppBrowser, InAppBrowserObject } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppAvailability } from '@awesome-cordova-plugins/app-availability/ngx';

@Component({
  selector: 'app-influencer-details',
  templateUrl: './influencer-details.page.html',
  styleUrls: ['./influencer-details.page.scss'],
})
export class InfluencerDetailsPage implements OnInit {
  influencer: any;
  custom_url: string;
  constructor(
    private router: Router,
    public platform: Platform,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser
    ) {
    if (this.router.getCurrentNavigation() != null) {
      this.influencer = this.router.getCurrentNavigation().extras.state.influencer;
      console.log(this.influencer);
    }
  }


  ngOnInit() {
    this.custom_url = 'https://instagram.com/';
    console.log('influencer-detail-page');
  }


  goInfluencerWorkout(influencer: any) {
    this.router.navigate(['influencer-workout'], { state: { influencer } });
  }

  goInfluencerNutrition(influencer: any) {
    this.router.navigate(['influencer-nutrition'], { state: { influencer } });
  }

  goInfluencerAbs(influencer: any) {
    this.router.navigate(['influencer-abs'], { state: { influencer } });
  }

  goInfluencerLifeStyle(influencer) {
    this.router.navigate(['influencer-lifestyle'], {
      state: { showMoreOptions: false, influencer },
    });
  }

  openInstagram() {
    let app;

    if (this.platform.is('ios')) {
      app = 'instagram://';
    } else if (this.platform.is('android')) {
      app = 'com.instagram.android';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.instagram.com/' + this.influencer.instagram);
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available');
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('instagram://user?username=' + this.influencer.instagram, '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.instagram.com/' + this.influencer.instagram, '_system');
        }
      );
  }

}
