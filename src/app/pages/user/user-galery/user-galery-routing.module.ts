import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGaleryPage } from './user-galery.page';

const routes: Routes = [
  {
    path: '',
    component: UserGaleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserGaleryPageRoutingModule {}
