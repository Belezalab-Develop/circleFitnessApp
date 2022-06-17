/* eslint-disable no-console */
import { CachingService } from './../../../services/auxiliar/caching.service';
import { Router } from '@angular/router';
import { IonRouterOutlet, NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nutrition-list',
  templateUrl: './nutrition-list.page.html',
  styleUrls: ['./nutrition-list.page.scss'],
})
export class NutritionListPage implements OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;


  nutritionCategory: any;
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
  };
  nutritionPrograms = [];
  nutritionProgramsGoals = [];
  nutritionProgramsSegments = [];
  nutritionProgramsConstraint = [];



  constructor(
    private navCtrl: NavController,
    private router: Router,
    private storageService: CachingService,
    private loadingController: LoadingController,
  ) {
    this.presentLoadingDefault();
  }

  ngOnInit() {
    console.log('Explore NutritionPage');
    this.getData();
  }

  async getData() {
    await this.storageService.getCachedRequest('test', '-nutri-segments').then(res => {
      this.nutritionProgramsSegments = res;

      console.info('goals', this.nutritionProgramsSegments);
    });
    await this.storageService.getCachedRequest('test', '-nutri-goals').then(res => {
      this.nutritionProgramsGoals = res;

      console.info('goals', this.nutritionProgramsGoals);
    });
    await this.storageService.getCachedRequest('test', '-nutri-constraint').then(res => {
      this.nutritionProgramsConstraint = res;

      console.info('goals', this.nutritionProgramsConstraint);
    });
  }

  //TODO:Evaluar si se pueden quitar;
  goBack() {
    /* if (this.routerOutlet.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.navigateRoot('/home-auth');
    } */
  }

  goNext() {
    /* if (this.routerOutlet.canGoBack()) { this.navCtrl.pop(); }
    else { this.navCtrl.navigateRoot('/home-auth'); } */
  }

  openNutrition(nutritionProgram) {
    this.router.navigateByUrl('nutrition-details', {
      state: { showMoreOptions: false, nutritionProgram },
    });
  }

  async presentLoadingDefault() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'un momento por favor ....'


    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }
}
