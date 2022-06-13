import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NutritionListPageRoutingModule } from './nutrition-list-routing.module';

import { NutritionListPage } from './nutrition-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NutritionListPageRoutingModule
  ],
  declarations: [NutritionListPage]
})
export class NutritionListPageModule {}
