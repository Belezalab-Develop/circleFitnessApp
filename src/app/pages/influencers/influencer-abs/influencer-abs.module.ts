import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfluencerAbsPageRoutingModule } from './influencer-abs-routing.module';

import { InfluencerAbsPage } from './influencer-abs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfluencerAbsPageRoutingModule
  ],
  declarations: [InfluencerAbsPage]
})
export class InfluencerAbsPageModule {}
