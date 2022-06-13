import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAuthPageRoutingModule } from './home-auth-routing.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

import { HomeAuthPage } from './home-auth.page';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAuthPageRoutingModule,
    TranslateModule.forChild(),
    PipesModule
  ],
  declarations: [HomeAuthPage]
})
export class HomeAuthPageModule {}
