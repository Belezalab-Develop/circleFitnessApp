import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfluencerDetailsPageRoutingModule } from './influencer-details-routing.module';

import { InfluencerDetailsPage } from './influencer-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfluencerDetailsPageRoutingModule
  ],
  declarations: [InfluencerDetailsPage]
})
export class InfluencerDetailsPageModule {}
