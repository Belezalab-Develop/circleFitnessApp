import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfluencerLifestylePageRoutingModule } from './influencer-lifestyle-routing.module';

import { InfluencerLifestylePage } from './influencer-lifestyle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfluencerLifestylePageRoutingModule
  ],
  declarations: [InfluencerLifestylePage]
})
export class InfluencerLifestylePageModule {}
