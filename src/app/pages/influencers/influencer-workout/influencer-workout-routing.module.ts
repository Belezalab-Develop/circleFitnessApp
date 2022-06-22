import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfluencerWorkoutPage } from './influencer-workout.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencerWorkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencerWorkoutPageRoutingModule {}
