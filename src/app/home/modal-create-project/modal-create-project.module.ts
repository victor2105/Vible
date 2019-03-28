import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalCreateProjectPage } from './modal-create-project.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCreateProjectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalCreateProjectPage]
})
export class ModalCreateProjectPageModule {}
