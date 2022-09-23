import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickingPageRoutingModule } from './picking-routing.module';

import { PickingPage } from './picking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickingPageRoutingModule
  ],
  declarations: [PickingPage]
})
export class PickingPageModule {}
