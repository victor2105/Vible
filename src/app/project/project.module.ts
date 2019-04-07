import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectPage } from './project.page';
import { ModalEditCelPage } from './modal-edit-cel/modal-edit-cel.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProjectPage, ModalEditCelPage],
  entryComponents: [ModalEditCelPage]
})
export class ProjectPageModule {}
