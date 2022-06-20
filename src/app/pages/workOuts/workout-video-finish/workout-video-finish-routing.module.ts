import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutVideoFinishPage } from './workout-video-finish.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutVideoFinishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutVideoFinishPageRoutingModule {}
