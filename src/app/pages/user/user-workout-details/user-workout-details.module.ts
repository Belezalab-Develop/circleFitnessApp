import { PipesModule } from './../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserWorkoutDetailsPageRoutingModule } from './user-workout-details-routing.module';

import { UserWorkoutDetailsPage } from './user-workout-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserWorkoutDetailsPageRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
    PipesModule
  ],
  declarations: [UserWorkoutDetailsPage]
})
export class UserWorkoutDetailsPageModule {}
