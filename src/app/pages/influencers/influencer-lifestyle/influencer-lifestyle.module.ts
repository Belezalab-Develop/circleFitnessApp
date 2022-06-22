import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
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
    InfluencerLifestylePageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forChild()
  ],
  declarations: [InfluencerLifestylePage]
})
export class InfluencerLifestylePageModule {}
