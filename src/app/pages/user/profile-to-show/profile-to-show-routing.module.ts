import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileToShowPage } from './profile-to-show.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileToShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileToShowPageRoutingModule {}
