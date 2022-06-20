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
    WorkoutVideoDetailsPageRoutingModule
  ],
  declarations: [WorkoutVideoDetailsPage]
})
export class WorkoutVideoDetailsPageModule {}
