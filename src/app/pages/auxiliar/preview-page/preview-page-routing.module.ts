import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewPagePage } from './preview-page.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewPagePageRoutingModule {}
