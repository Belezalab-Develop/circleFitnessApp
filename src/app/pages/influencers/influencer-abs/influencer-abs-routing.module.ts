import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfluencerAbsPage } from './influencer-abs.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencerAbsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencerAbsPageRoutingModule {}
