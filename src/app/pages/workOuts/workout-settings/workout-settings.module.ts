import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutSettingsPageRoutingModule } from './workout-settings-routing.module';

import { WorkoutSettingsPage } from './workout-settings.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutSettingsPageRoutingModule,
    TranslateModule.forChild(),
    PipesModule,
    ComponentsModule
  ],
  declarations: [WorkoutSettingsPage]
})
export class WorkoutSettingsPageModule { }
