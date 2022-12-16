import { PipesModule } from './../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutDetailsPageRoutingModule } from './workout-details-routing.module';

import { WorkoutDetailsPage } from './workout-details.page';
import { IonicImageLoaderModule } from 'ionic-image-loader-v5';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    PipesModule,
    WorkoutDetailsPageRoutingModule,
    TranslateModule.forChild(),
    IonicImageLoaderModule
  ],
  declarations: [WorkoutDetailsPage]
})
export class WorkoutDetailsPageModule {}
