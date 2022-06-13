import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfluencerDetailsPage } from './influencer-details.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencerDetailsPageRoutingModule {}
