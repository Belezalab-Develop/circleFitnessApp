import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NutritionDetailsPageRoutingModule } from './nutrition-details-routing.module';

import { NutritionDetailsPage } from './nutrition-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forChild(),
    IonicModule,
    NutritionDetailsPageRoutingModule
  ],
  declarations: [NutritionDetailsPage]
})
export class NutritionDetailsPageModule {}
