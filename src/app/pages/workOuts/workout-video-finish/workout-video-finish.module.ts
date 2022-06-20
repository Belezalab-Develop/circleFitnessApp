import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutVideoFinishPageRoutingModule } from './workout-video-finish-routing.module';

import { WorkoutVideoFinishPage } from './workout-video-finish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutVideoFinishPageRoutingModule
  ],
  declarations: [WorkoutVideoFinishPage]
})
export class WorkoutVideoFinishPageModule {}
