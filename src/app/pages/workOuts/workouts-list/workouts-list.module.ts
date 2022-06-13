import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsListPageRoutingModule } from './workouts-list-routing.module';

import { WorkoutsListPage } from './workouts-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsListPageRoutingModule
  ],
  declarations: [WorkoutsListPage]
})
export class WorkoutsListPageModule {}
