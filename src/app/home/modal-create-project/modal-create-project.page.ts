import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ProjectFactory } from 'src/helpers/projectFactory';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-modal-create-project',
  templateUrl: './modal-create-project.page.html',
  styleUrls: ['./modal-create-project.page.scss'],
})
export class ModalCreateProjectPage implements OnInit {

  name;

  constructor(public modalController: ModalController,
    private storage: StorageService){
   
  }

  ngOnInit() {
  }

  async create() {
    // if (await this.storage.get(this.name)) {
    //   this.dismiss()
    //   return
    // };

    let project = new ProjectFactory().createBasicProject(this.name);
    project.name = this.name;
    const value = JSON.stringify(project);
    await this.storage.set(this.name, value);
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }  

}
