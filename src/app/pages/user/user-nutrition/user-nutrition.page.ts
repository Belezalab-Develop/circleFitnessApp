import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { IonSlides, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

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

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    public router: Router,
  ) { }

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

  getNutritionDAta() {
    //TODO: PAsar esto al storage, al momento del login,
    this.userService.getNutritionProgram()
      .subscribe((nutritionProgram: any) => {
        this.nutritionProgram = nutritionProgram;
        console.log(nutritionProgram);
      }, err => {
        this.nutritionProgram = null;
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


  goInfluencerDetail(influencer: any) {
    console.log(influencer);
    this.router.navigate(['/influencer-details'], {
      state: { influencer },
      replaceUrl:true
    });
  }

}
