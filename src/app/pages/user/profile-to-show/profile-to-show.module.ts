import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileToShowPageRoutingModule } from './profile-to-show-routing.module';

import { ProfileToShowPage } from './profile-to-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileToShowPageRoutingModule
  ],
  declarations: [ProfileToShowPage]
})
export class ProfileToShowPageModule {}
