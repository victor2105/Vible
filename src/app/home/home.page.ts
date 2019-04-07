import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { ModalCreateProjectPage } from './modal-create-project/modal-create-project.page';
import { ReorderList } from 'src/helpers/reorder';
import { ReorderSystem } from 'src/systems/ReorderSystem';
import { Home } from 'src/models/home';
import { Project } from '../../models/project';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  home: Home;

  reorderList: ReorderList;
  reorderSystem: ReorderSystem;

  // Show List
  public items: Array<{ title: string; }> = [];

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    public alertController: AlertController,
    private storage: StorageService
  ) {

    // Show List
    this.home = new Home();
    this.reorderSystem = new ReorderSystem();
  }

  async ngOnInit(){
    this.home = await this.storage.getHome();
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
    let modal = await this.modalController.create({
      component: ModalCreateProjectPage,
      componentProps: { value: 123 }
    });

    modal.onDidDismiss()
    .then(async () => {
      console.log("Back");
      this.home = await this.storage.getHome();
    });

    return await modal.present();    
  }

  getFromNative(){

  }



  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  
}
