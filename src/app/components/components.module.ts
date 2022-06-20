import { CountdownComponent } from './countdown/countdown.component';
import { CachedImageComponent } from './cached-image/cached-image.component';
import { CustomBackButtonComponent } from './custom-back-button/custom-back-button.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';

import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


import { TranslateModule } from '@ngx-translate/core';


import { CommonModule } from '@angular/common';
import { CustomTabComponent } from './custom-tab/custom-tab.component';

@NgModule({
	declarations: [

		CustomTabComponent,
    NavHeaderComponent,
    CustomBackButtonComponent,
    CachedImageComponent,
    CountdownComponent


	],
	imports: [
		IonicModule,
		CommonModule,
		TranslateModule.forChild()
	],
	exports: [

		CustomTabComponent,
    NavHeaderComponent,
    CustomBackButtonComponent,
    CachedImageComponent,
    CountdownComponent



	]
})
export class ComponentsModule { }
