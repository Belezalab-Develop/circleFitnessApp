import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutSettingsPageRoutingModule } from './workout-settings-routing.module';

import { WorkoutSettingsPage } from './workout-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutSettingsPageRoutingModule
  ],
  declarations: [WorkoutSettingsPage]
})
export class WorkoutSettingsPageModule {}
