import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfluencerNutritionPageRoutingModule } from './influencer-nutrition-routing.module';

import { InfluencerNutritionPage } from './influencer-nutrition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfluencerNutritionPageRoutingModule
  ],
  declarations: [InfluencerNutritionPage]
})
export class InfluencerNutritionPageModule {}
