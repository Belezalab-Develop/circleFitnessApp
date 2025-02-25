import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WizardPageRoutingModule } from './wizard-routing.module';

import { WizardPage } from './wizard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WizardPageRoutingModule
  ],
  declarations: [WizardPage]
})
export class WizardPageModule {}
