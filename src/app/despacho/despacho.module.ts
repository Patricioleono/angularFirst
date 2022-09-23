import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespachoPageRoutingModule } from './despacho-routing.module';

import { DespachoPage } from './despacho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespachoPageRoutingModule
  ],
  declarations: [DespachoPage]
})
export class DespachoPageModule {}
