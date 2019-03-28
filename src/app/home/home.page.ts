import { Component } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { ModalCreateProjectPage } from './modal-create-project/modal-create-project.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Show List
  public items: Array<{ title: string; }> = [];

  constructor(
    public toastController: ToastController,
    public modalController: ModalController
  ) {
    // Show List
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i
      });
    }

    // Show Toast
    this.message("Show Toast");
  }

  // Show Toast
  async message(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  // Show Modal
  async create() {
    console.log("Click");
    const modal = await this.modalController.create({
      component: ModalCreateProjectPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
