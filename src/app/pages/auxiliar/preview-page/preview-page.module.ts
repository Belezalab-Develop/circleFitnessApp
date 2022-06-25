import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewPagePageRoutingModule } from './preview-page-routing.module';

import { PreviewPagePage } from './preview-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewPagePageRoutingModule
  ],
  declarations: [PreviewPagePage]
})
export class PreviewPagePageModule {}
