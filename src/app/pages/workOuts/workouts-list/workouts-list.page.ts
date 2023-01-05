import { LoadingController, IonRouterOutlet } from '@ionic/angular';

/* eslint-disable no-console */
import { CachingService } from './../../../services/auxiliar/caching.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkoutListParams } from 'src/app/models/workoutlistparams';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/services/analytics.service';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation } from 'swiper';
import { AngularFirePerformance } from '@angular/fire/compat/performance';
import { Smartlook, SmartlookNavigationEvent, SmartlookViewState} from '@awesome-cordova-plugins/smartlook/ngx';


SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation]);


@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.page.html',
  styleUrls: ['./workouts-list.page.scss'],
})
export class WorkoutsListPage implements OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  exercisePrograms = [];
  goalsPrograms = [];
  segmentsPrograms = [];
  isCharge = false;

  sliderOpts= {
    initialSlide: 1,
    slidesPerView: 3,

  };


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private storageService: CachingService,
    private loadingController: LoadingController,
    private titleService: Title,
    private analitycs: AnalyticsService,
    private performance: AngularFirePerformance,
    private smartlook: Smartlook

  ) {
    this.presentLoadingDefault();
    this.getData();
    this.titleService.setTitle ('PLANOS DE TREINAMENTO');
    this.analitycs.setScreenName('PLANOS DE TREINAMENTO');
    this.smartlook.trackNavigationEvent(new SmartlookNavigationEvent('PLANOS DE TREINAMENTO', SmartlookViewState.START));
  }



  async ngOnInit() {
    console.log('Workouts List Page');

  }

  async getData(){

    const trace = await this.performance.trace('workouts -list');
    trace.start();
    await this.storageService.getCachedRequest('test', '-work-segments').then(res => {
      this.segmentsPrograms = res;
      console.info('segments', this.segmentsPrograms);

    });

    await this.storageService.getCachedRequest('test', '-work-goals').then(res => {
      this.goalsPrograms = res;

      console.info('goals', this.goalsPrograms);
    });

    this.isCharge = true;

    trace.stop();


  }

  //TODO:Evaluar si se pueden quitar;
  goBack() {
    if (this.routerOutlet?.canGoBack()) {
      this.navCtrl.pop();
    }else {
      this.navCtrl.navigateRoot('/home-auth');
    }
  }

  async openDetailWorkout(workout: any) {
    const  params = new WorkoutListParams();
     params.ShowSubList = true;
    params.ShowLocation = false;

    await this.router.navigate(['/workout-details'], {
      queryParams: { params,  workout },
    });
  }

  async presentLoadingDefault() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações ....'


    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();

    }, 800);
  }


}
