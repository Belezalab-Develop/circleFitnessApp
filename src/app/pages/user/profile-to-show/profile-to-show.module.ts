import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileToShowPageRoutingModule } from './profile-to-show-routing.module';

import { ProfileToShowPage } from './profile-to-show.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileToShowPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forChild()
  ],
  declarations: [ProfileToShowPage]
})
export class ProfileToShowPageModule {}
