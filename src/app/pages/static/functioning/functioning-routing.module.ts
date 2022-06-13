import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunctioningPage } from './functioning.page';

const routes: Routes = [
  {
    path: '',
    component: FunctioningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FunctioningPageRoutingModule {}
