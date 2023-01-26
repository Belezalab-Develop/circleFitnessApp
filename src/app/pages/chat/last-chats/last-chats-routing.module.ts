import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LastChatsPage } from './last-chats.page';

const routes: Routes = [
  {
    path: '',
    component: LastChatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LastChatsPageRoutingModule {}
