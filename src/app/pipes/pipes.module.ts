import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@NgModule({
	declarations: [TimeAgoPipe , TruncatePipe],
	imports: [IonicModule, CommonModule],
	exports: [TimeAgoPipe, TruncatePipe, CommonModule]
})
export class PipesModule {
	// static forRoot() {
 //      return {
 //          ngModule: PipesModule,
 //          providers: [],
 //      };
 //   }
}
