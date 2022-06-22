import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfluencerLifestylePage } from './influencer-lifestyle.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencerLifestylePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencerLifestylePageRoutingModule {}
