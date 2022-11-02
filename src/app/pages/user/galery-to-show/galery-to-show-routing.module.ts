import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleryToShowPage } from './galery-to-show.page';

const routes: Routes = [
  {
    path: '',
    component: GaleryToShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleryToShowPageRoutingModule {}
