import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserNutritionPageRoutingModule } from './user-nutrition-routing.module';

import { UserNutritionPage } from './user-nutrition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserNutritionPageRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
    PipesModule
  ],

  declarations: [UserNutritionPage]
})
export class UserNutritionPageModule {}
