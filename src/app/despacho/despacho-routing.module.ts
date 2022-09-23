import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespachoPage } from './despacho.page';

const routes: Routes = [
  {
    path: '',
    component: DespachoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespachoPageRoutingModule {}
