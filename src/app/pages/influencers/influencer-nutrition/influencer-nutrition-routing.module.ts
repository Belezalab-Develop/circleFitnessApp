import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfluencerNutritionPage } from './influencer-nutrition.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencerNutritionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencerNutritionPageRoutingModule {}
