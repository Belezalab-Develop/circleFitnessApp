import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FunctioningPageRoutingModule } from './functioning-routing.module';

import { FunctioningPage } from './functioning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FunctioningPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FunctioningPage]
})
export class FunctioningPageModule {}
