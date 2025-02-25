import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsPageRoutingModule } from './chats-routing.module';

import { ChatsPage } from './chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forChild()
  ],
  declarations: [ChatsPage]
})
export class ChatsPageModule {}
