
/* eslint-disable no-console */
import { CachingService } from './../../../services/auxiliar/caching.service';
import { ApiWorkoutsService } from './../../../services/workouts/api-workouts.service';
import { AuthProvider } from './../../../providers/auth/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { WorkoutListParams } from 'src/app/models/workoutlistparams';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.page.html',
  styleUrls: ['./workouts-list.page.scss'],
})
export class WorkoutsListPage implements OnInit {

  exercisePrograms = [];
  goalsPrograms = [];
  segmentsPrograms = [];

  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 3,
  };

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthProvider,
    private workout: ApiWorkoutsService,
    private storageService: CachingService,

  ) { }



  ngOnInit() {

    console.log('Workouts List Page');

    this.storageService.getCachedRequest('test', '-work-goals').then(res => {
      this.goalsPrograms = res;

      console.info('goals', this.goalsPrograms);
    });

    this.storageService.getCachedRequest('test', '-work-segments').then(res => {
      this.segmentsPrograms = res;
      console.info('segments', this.segmentsPrograms);
    });



  }

  goBack() {
    this.navCtrl.navigateRoot('/home-auth');
  }

  goNext() {

    this.router.navigateByUrl('workouts-list', {replaceUrl: true});
  }

  openDetailWorkout(workout: any) {
    const  params = new WorkoutListParams();
     params.ShowSubList = true;
    params.ShowLocation = false;

    this.router.navigate(['/workout-details'], {
      queryParams: { params,  workout },
    });
  }


}
