import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from './../../../components/components.module';
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
    InfluencerAbsPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forChild()
  ],
  declarations: [InfluencerAbsPage]
})
export class InfluencerAbsPageModule {}
