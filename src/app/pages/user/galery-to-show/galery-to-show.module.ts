import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleryToShowPageRoutingModule } from './galery-to-show-routing.module';

import { GaleryToShowPage } from './galery-to-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleryToShowPageRoutingModule
  ],
  declarations: [GaleryToShowPage]
})
export class GaleryToShowPageModule {}
