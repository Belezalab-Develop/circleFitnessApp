import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutSettingsPage } from './workout-settings.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutSettingsPageRoutingModule {}
