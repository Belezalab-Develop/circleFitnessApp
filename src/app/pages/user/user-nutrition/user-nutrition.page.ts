import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { IonSlides, NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-user-nutrition',
  templateUrl: './user-nutrition.page.html',
  styleUrls: ['./user-nutrition.page.scss'],
})
export class UserNutritionPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  user: any;
  isFav: boolean;
  showMoreOptions: boolean;
  nutritionProgram = null;
  isLoaded = true;

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    public router: Router,
    private titleService: Title,
    private analitycs: AnalyticsService,
    private loadingController: LoadingController,
  ) {

  }

  ngOnInit() {

    console.log('UserNutrititionPage');

    this.getNutritionDAta();
    this.getNavigationData();



  }

  getNavigationData() {
    if (this.router.getCurrentNavigation().extras.state.showMoreOptions) {
      this.showMoreOptions = this.router.getCurrentNavigation().extras.state.showMoreOptions;

      if (this.router.getCurrentNavigation().extras.state.isFav) {
        this.isFav = this.router.getCurrentNavigation().extras.state.isFav;

      }
    } else {
      if (!this.router.getCurrentNavigation().extras.state.influencer) {
        this.isFav = false;
        this.showMoreOptions = false;
      }
    }

  }

  async getNutritionDAta() {
    //TODO: PAsar esto al storage, al momento del login,
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'
    });

    loading.present();
    this.userService.getNutritionProgram()
      .subscribe((nutritionProgram: any) => {

        if (nutritionProgram !== null) {
          this.nutritionProgram = nutritionProgram;
          console.log('nutritionProgram:::', this.nutritionProgram);
          this.titleService.setTitle(`USER - PLANO DE NUTRIÇÃO - ${this.nutritionProgram.label}`);
          this.analitycs.setScreenName(`USER - PLANO DE NUTRIÇÃO - ${this.nutritionProgram.label}`);
          this.isLoaded = false;
          loading.dismiss();

        } else {
          this.nutritionProgram = null;
          this.isLoaded = false;
          loading.dismiss();
        }

      }, err => {
        this.nutritionProgram = null;
        this.isLoaded = false;
        loading.dismiss();
        console.log(err);
      });
  }

  goFoodDetail(food, nutritionProgram) {
    this.router.navigateByUrl('/food-detail', { state: { food, nutritionProgram } });
  }

  totalProteins() {
    return _.sumBy(this.nutritionProgram.days[0].meals, (meal) => _.sumBy(meal.recipes, 'proteins'));
  }

  totalCarbohydrates() {
    return _.sumBy(this.nutritionProgram.days[0].meals, (meal) => _.sumBy(meal.recipes, 'carbohydrates'));
  }

  totalFats() {
    return _.sumBy(this.nutritionProgram.days[0].meals, (meal) => _.sumBy(meal.recipes, 'fats'));
  }

  totalCalories() {
    return _.sumBy(this.nutritionProgram.days[0].meals, (meal) => _.sumBy(meal.recipes, 'calories'));
  }

  loadingData() {

  }

  goInfluencerDetail(influencer: any) {
    console.log(influencer);
    this.router.navigate(['/influencer-details'], {
      state: { influencer },
      replaceUrl: true
    });
  }

}
