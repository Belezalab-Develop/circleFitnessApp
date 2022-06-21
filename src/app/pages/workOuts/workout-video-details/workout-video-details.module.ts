import { ComponentsModule } from './../../../components/components.module';
import { PipesModule } from './../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutVideoDetailsPageRoutingModule } from './workout-video-details-routing.module';

import { WorkoutVideoDetailsPage } from './workout-video-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutVideoDetailsPageRoutingModule,
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
  declarations: [WorkoutVideoDetailsPage]
})
export class WorkoutVideoDetailsPageModule { }
