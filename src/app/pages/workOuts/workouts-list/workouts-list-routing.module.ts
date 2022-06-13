import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutsListPage } from './workouts-list.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsListPageRoutingModule {}
