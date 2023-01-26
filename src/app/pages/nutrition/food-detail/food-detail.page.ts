import { ImageModalPage } from './../../auxiliar/image-modal/image-modal.page';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {
  //@ViewChild(IonicStorageModule, { static: true }) routerOutlet: IonRouterOutlet;
  meal: any = {};
  nutritionProgram: any = {};
  showMore = false;
  mealOptions;

  constructor(
    @Optional() private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController,
    private router: Router,
    private modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.optainData();
  }

  optainData() {
    if (this.router.getCurrentNavigation().extras.state.food) {
      this.meal = this.router.getCurrentNavigation().extras.state.food;
      console.log('comidas', this.meal);
      this.mealOptions = this.meal.recipes.map(item => ({
        ...item,
        instruc: item.instructions.split('\n').join('<br />'),
        instrucTrunc: item.instructions.split('\n').slice(0, 190),
        showMore: false
      }));
      console.log('mealoption', this.mealOptions);
    }

    if (this.router.getCurrentNavigation().extras.state.nutritionProgram) {
      this.nutritionProgram = this.router.getCurrentNavigation().extras.state.nutritionProgram;
      //console.log('nutrition ',this.nutritionProgram);
    }
  }

  goBack(): void {
    if (this.routerOutlet && this.routerOutlet.canGoBack()) {
      this.navCtrl.setDirection('back');
      this.routerOutlet.pop();
    } else {
      this.navCtrl.navigateRoot('/home-auth');
    }
  }


  totalProteins() {

    return _.sumBy(this.meal.recipes, meal => meal.proteins);
  }

  totalCarbohydrates() {
    return _.sumBy(this.meal.recipes, meal => meal.carbohydrates);
  }

  totalFats() {
    return _.sumBy(this.meal.recipes, meal => meal.fats);
  }

  totalCalories() {
    return _.sumBy(this.meal.recipes, meal => meal.calories);
  }

  trimString(text, length) {
    return text.length > length
      ? text.substring(0, length) + '...'
      : text;
  }

  async openPreview(img){
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img
      },
      cssClass: 'transparent-modal'
    });
    modal.present();
  }

}
