import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuplementsPageRoutingModule } from './suplements-routing.module';

import { SuplementsPage } from './suplements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuplementsPageRoutingModule
  ],
  declarations: [SuplementsPage]
})
export class SuplementsPageModule {}
