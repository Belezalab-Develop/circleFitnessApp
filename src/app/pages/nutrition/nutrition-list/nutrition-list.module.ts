import { ComponentsModule } from './../../../components/components.module';
import { PipesModule } from './../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NutritionListPageRoutingModule } from './nutrition-list-routing.module';

import { NutritionListPage } from './nutrition-list.page';
import { IonicImageLoaderModule } from 'ionic-image-loader-v5';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forChild(),
    FormsModule,
    IonicModule,
    NutritionListPageRoutingModule,
    IonicImageLoaderModule,
    SwiperModule
  ],
  declarations: [NutritionListPage]
})
export class NutritionListPageModule {}
