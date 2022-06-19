import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuplementsPage } from './suplements.page';

const routes: Routes = [
  {
    path: '',
    component: SuplementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuplementsPageRoutingModule {}
