import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentsModule } from './../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfluencerListPageRoutingModule } from './influencer-list-routing.module';

import { InfluencerListPage } from './influencer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfluencerListPageRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [InfluencerListPage]
})
export class InfluencerListPageModule { }
