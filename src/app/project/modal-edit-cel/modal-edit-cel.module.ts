import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalEditCelPage } from './modal-edit-cel.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditCelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalEditCelPage]
})
export class ModalEditCelPageModule {}
