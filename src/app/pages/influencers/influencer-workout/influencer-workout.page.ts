import { LoadingController } from '@ionic/angular';
import { ApiWorkoutsService } from './../../../services/workouts/api-workouts.service';
import { Router } from '@angular/router';
import { ApiInfluencersService } from './../../../services/influencers/api-influencers.service';
import { Component, OnInit } from '@angular/core';
import { WorkoutListParams } from 'src/app/models/workoutlistparams';

@Component({
  selector: 'app-influencer-workout',
  templateUrl: './influencer-workout.page.html',
  styleUrls: ['./influencer-workout.page.scss'],
})
export class InfluencerWorkoutPage implements OnInit {
  workoutSections: any;
  influencer: any;
  influencerData: any;
  workouts: any;
  isLoaded = true;
  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 3,
  };

  constructor(
    public workout: ApiWorkoutsService,
    public router: Router,
    public influencerService: ApiInfluencersService,
    private loadingController: LoadingController,
  ) {
    this.getData();
  }

  async ngOnInit() {
   /*  const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'
    });
    loading.present(); */
    console.log('influencer workout page');

   /*  loading.dismiss(); */

  }

  async getData(){

    if (this.router.getCurrentNavigation() != null) {

      this.influencer =
        this.router.getCurrentNavigation().extras.state.influencer;

      this.influencerService.influencer(this.influencer,'-work-influencer',true).subscribe(
        (response: any) => {
          this.influencerData = response;
          console.log('influencer', this.influencerData);
          this.isLoaded = false;

        },
        (err) => { }
      );
    }
  }


 async goWorkoutList(workout: any) {
    console.log(workout);
    const  params = new WorkoutListParams();
     params.ShowSubList = true;
    params.ShowLocation = false;

    await this.router.navigate(['/workout-details'], {
      queryParams: { params,  workout }
    });
  }

}
