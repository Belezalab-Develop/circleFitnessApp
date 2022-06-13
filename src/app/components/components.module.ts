
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { TranslateModule } from '@ngx-translate/core';


import { CommonModule } from '@angular/common';
import { CustomTabComponent } from './custom-tab/custom-tab.component';

@NgModule({
	declarations: [

		CustomTabComponent


	],
	imports: [
		IonicModule,
		CommonModule,
		TranslateModule.forChild()
	],
	exports: [

		CustomTabComponent


	]
})
export class ComponentsModule { }
