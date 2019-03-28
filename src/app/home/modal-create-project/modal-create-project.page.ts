import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-create-project',
  templateUrl: './modal-create-project.page.html',
  styleUrls: ['./modal-create-project.page.scss'],
})
export class ModalCreateProjectPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
