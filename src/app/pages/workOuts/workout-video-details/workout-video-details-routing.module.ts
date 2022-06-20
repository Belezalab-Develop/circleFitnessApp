import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutVideoDetailsPage } from './workout-video-details.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutVideoDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutVideoDetailsPageRoutingModule {}
