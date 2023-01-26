import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LastChatsPageRoutingModule } from './last-chats-routing.module';

import { LastChatsPage } from './last-chats.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LastChatsPageRoutingModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forChild()
  ],
  declarations: [LastChatsPage]
})
export class LastChatsPageModule {}
