import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentsModule } from './../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
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
    WorkoutVideoFinishPageRoutingModule,
    TranslateModule.forChild(),
    ComponentsModule,
    PipesModule

  ],
  declarations: [WorkoutVideoFinishPage]
})
export class WorkoutVideoFinishPageModule { }
