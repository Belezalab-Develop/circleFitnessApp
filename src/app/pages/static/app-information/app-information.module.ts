import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppInformationPageRoutingModule } from './app-information-routing.module';

import { AppInformationPage } from './app-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppInformationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AppInformationPage]
})
export class AppInformationPageModule {}
