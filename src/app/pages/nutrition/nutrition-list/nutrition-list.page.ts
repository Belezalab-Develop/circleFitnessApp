import { AnalyticsService } from './../../../services/analytics.service';
import { Title } from '@angular/platform-browser';
/* eslint-disable no-console */
import { CachingService } from './../../../services/auxiliar/caching.service';
import { Router } from '@angular/router';
import { IonRouterOutlet, NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation } from 'swiper';


SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation]);

@Component({
  selector: 'app-nutrition-list',
  templateUrl: './nutrition-list.page.html',
  styleUrls: ['./nutrition-list.page.scss'],
})
export class NutritionListPage implements OnInit {
  //@ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;


  nutritionCategory: any;
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
  };
  nutritionPrograms = [];
  nutritionProgramsGoals = [];
  nutritionProgramsSegments = [];
  nutritionProgramsConstraint = [];
  isCharge = false;



  constructor(
    @Optional() private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController,
    private router: Router,
    private storageService: CachingService,
    private loadingController: LoadingController,
    private titleService: Title,
    private analitycs: AnalyticsService

  ) {
    this.presentLoadingDefault();
    this.getData();
    this.titleService.setTitle ('Nutrition List');
    this.analitycs.setScreenName('Nutrition List');
  }

  ngOnInit() {
    console.log('Explore NutritionPage');


  }

  ionViewWillEnter(){

  }

  async getData() {


    await this.storageService.getCachedRequest('test', '-nutri-segments').then(res => {
      this.nutritionProgramsSegments = res;

      console.info('segments', this.nutritionProgramsSegments);
    });
    await this.storageService.getCachedRequest('test', '-nutri-goals').then(res => {
      this.nutritionProgramsGoals = res;

      console.info('goals', this.nutritionProgramsGoals);
    });
    await this.storageService.getCachedRequest('test', '-nutri-constraint').then(res => {
      this.nutritionProgramsConstraint = res;

      console.info('constraints', this.nutritionProgramsConstraint);
    });

    this.isCharge = true;
  }

  //TODO:Evaluar si se pueden quitar;
  goBack(): void {
    if (this.routerOutlet && this.routerOutlet.canGoBack()) {
      this.navCtrl.setDirection('back');
      this.routerOutlet.pop();
    } else {
      this.navCtrl.navigateBack('/home-auth');
    }
  }


  async openNutrition(nutritionProgram) {
    await this.router.navigateByUrl('nutrition-details', {
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

    }, 800);
  }
}
