import { LoadingController, IonRouterOutlet } from '@ionic/angular';

/* eslint-disable no-console */
import { CachingService } from './../../../services/auxiliar/caching.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkoutListParams } from 'src/app/models/workoutlistparams';

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

  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 3,
  };


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private storageService: CachingService,
    private loadingController: LoadingController

  ) {
    this.presentLoadingDefault();
    this.getData();
  }



  async ngOnInit() {
    console.log('Workouts List Page');

  }

  async getData(){

    await this.storageService.getCachedRequest('test', '-work-goals').then(res => {
      this.goalsPrograms = res;

      console.info('goals', this.goalsPrograms);
    });

    await this.storageService.getCachedRequest('test', '-work-segments').then(res => {
      this.segmentsPrograms = res;
      console.info('segments', this.segmentsPrograms);

    });
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
      message: 'un momento por favor ....'


    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.isCharge = true;
    }, 600);
  }


}
