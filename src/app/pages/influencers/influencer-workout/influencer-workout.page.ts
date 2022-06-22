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
  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 3,
  };

  constructor(
    public workout: ApiWorkoutsService,
    public router: Router,
    public influencerService: ApiInfluencersService
  ) {
    if (this.router.getCurrentNavigation() != null) {
      this.influencer =
        this.router.getCurrentNavigation().extras.state.influencer;

      this.influencerService.influencer(this.influencer,'-work-influencer',true).subscribe(
        (response: any) => {
          this.influencerData = response;
          console.log('influencer', this.influencerData);
        },
        (err) => { }
      );
    }
  }

  ngOnInit() {
    console.log('influencer workout page');
  }

  //TODO:: hay un error cuando redirige, revisar si creo nueva pagina
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
