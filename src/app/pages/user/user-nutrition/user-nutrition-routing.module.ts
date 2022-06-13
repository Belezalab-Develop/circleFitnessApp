import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserNutritionPage } from './user-nutrition.page';

const routes: Routes = [
  {
    path: '',
    component: UserNutritionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserNutritionPageRoutingModule {}
