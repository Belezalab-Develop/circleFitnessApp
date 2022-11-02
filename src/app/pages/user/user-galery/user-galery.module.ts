import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserGaleryPageRoutingModule } from './user-galery-routing.module';

import { UserGaleryPage } from './user-galery.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserGaleryPageRoutingModule,
    PipesModule,
    ComponentsModule,
    TranslateModule.forChild()
  ],
  declarations: [UserGaleryPage]
})
export class UserGaleryPageModule {}
