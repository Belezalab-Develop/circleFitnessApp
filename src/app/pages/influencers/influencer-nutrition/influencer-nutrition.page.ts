import { LoadingController } from '@ionic/angular';
import { ApiInfluencersService } from './../../../services/influencers/api-influencers.service';
import { Router } from '@angular/router';
import { ApiNutritionService } from './../../../services/nutrition/api-nutrition.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-influencer-nutrition',
  templateUrl: './influencer-nutrition.page.html',
  styleUrls: ['./influencer-nutrition.page.scss'],
})
export class InfluencerNutritionPage implements OnInit {

  workoutSections: any;
  workouts: any;
  influencer: any;
  influencerData: any;
  isLoaded = true;

  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 3,
  };
  constructor(
    public nutrition: ApiNutritionService,
    public router: Router,
    public influencerService: ApiInfluencersService,
    private loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    console.log('influencer nutrition page');
    this.getData();
  }

  async getData(){
    /* const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'
    });
    loading.present(); */
    if (this.router.getCurrentNavigation() != null) {

      this.influencer =
        this.router.getCurrentNavigation().extras.state.influencer;
        console.log(this.influencer);

      this.influencerService.influencer(this.influencer, '-nutrition-influencer', true).subscribe(
        (response: any) => {
          this.influencerData = response;
          console.log('influencer', this.influencerData);
          this.isLoaded =false;
          /* loading.dismiss(); */
        },
        (err) => {}
      );
    }
  }

  openNutrition(nutritionProgram) {
    this.router.navigateByUrl('/nutrition-details', {
      state: { showMoreOptions: false, nutritionProgram },
      replaceUrl: true
    });
  }

}
