/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import { UserService } from './../../../services/user.service';
import { IonRouterOutlet, NavController, AlertController } from '@ionic/angular';
import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { WorkoutListParams } from 'src/app/models/workoutlistparams';

@Component({
  selector: 'app-nutrition-details',
  templateUrl: './nutrition-details.page.html',
  styleUrls: ['./nutrition-details.page.scss'],
})
export class NutritionDetailsPage implements OnInit {
  //@ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  custom_url: string;
  user: any;
  influencer: any;
  nutritionProgram: any = {};
  nutritionIndicator = false;
  showMore = false;
  subscribe = false;



  constructor(
    @Optional() private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private userService: UserService,
    private router: Router,

  ) {
    if (this.router.getCurrentNavigation().extras.state.influencer) {
      // entra por influencer
      console.log('entra por influencer', this.router.getCurrentNavigation().extras.state.influencer);
      this.user.first_name = this.router.getCurrentNavigation().extras.state.influencer.nombre;
      this.user.last_name = this.router.getCurrentNavigation().extras.state.influencer.apellido;
      this.user.avatar = this.router.getCurrentNavigation().extras.state.influencer.image;
      this.influencer = this.router.getCurrentNavigation().extras.state.influencer;
    }

    if (this.router.getCurrentNavigation().extras.state.nutritionProgram) {
      this.nutritionProgram = this.router.getCurrentNavigation().extras.state.nutritionProgram;
      if (this.nutritionProgram.influencer) {
        this.influencer = this.nutritionProgram.influencer;
        console.info('INFLUENCER:', this.influencer);
      }

      // entra por nutrition program
      console.info('// entra por nutrition program', this.nutritionProgram);


    }
  }

  ngOnInit() {
    console.info('Details Nutrition Page');
    this.custom_url = 'https://circlefitness.app/media/';
  }

  goFoodDetail(food, nutritionProgram) {
    this.router.navigateByUrl('/food-detail', { state: { food, nutritionProgram } });
  }

  goInfluencerDetail(influencer: any) {
    this.router.navigate(['/influencer-details'], { state: { influencer }, replaceUrl:true });
  }

  goDetail() {
    const params = new WorkoutListParams();
    params.ShowSubList = true;
    params.ShowLocation = false;
    this.router.navigate(['/user-nutritition'], { queryParams: params });
  }

  clickSubscribe(flag) {
    this.subscribe = flag;
    this.changeNutrition();
  }

  goBack(): void {
    if (this.routerOutlet && this.routerOutlet.canGoBack()) {
      this.navCtrl.setDirection('back');
      this.routerOutlet.pop();
    } else {
      this.navCtrl.navigateBack('/home-auth');
    }
  }



  goAlarms() {
    this.router.navigate(['/alarms']);
  }

  goSuplements() {
    this.router.navigate(['/suplements']);
  }

  goSearch() {

    this.router.navigate(['/explore-nutrition']);
  }

  async changeNutrition() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'NOVO PLANO DE NUTRIÇÃO?',
      message: `Seu novo Plano Nutricional será: ${this.nutritionProgram.label}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Aceitar',
          handler: () => {
            console.log('Confirm Okay');
            // this.adMessage();
            this.nutritionIndicator = true;
            this.userService.putNutritionProgram({
              nutrition_program_id: this.nutritionProgram.id,
            })
              .subscribe((nutritionProgram: any) => {
                //console.log(nutritionProgram);
                //this.nutritionProgram = nutritionProgram;
              }, err => {
                console.log(err);
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async adMessage() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-nutrition-class',
      message: 'Aqui você encontrará seu novo plano',
      buttons: [
        {
          text: 'Aquí ',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '',
          handler: () => {
            console.log('Confirm Okay');

          }
        }
      ]
    });
    await alert.present();
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


}
