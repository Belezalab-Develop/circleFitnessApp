import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsListPageRoutingModule } from './workouts-list-routing.module';

import { WorkoutsListPage } from './workouts-list.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    WorkoutsListPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [WorkoutsListPage]
})
export class WorkoutsListPageModule {}
