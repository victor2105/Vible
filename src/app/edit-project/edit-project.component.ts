import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/models/project';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  editMode = false;

  email: string;
  project: Project;

  name;
  background;

  disableButton = false;

  colors = [
    { class: 'primary' },
    { class: 'secondary' },
    { class: 'danger' },
    { class: 'v-purple' },
    { class: 'light' },
    { class: 'dark' }
  ];

  constructor(
    public modalController: ModalController,
    public navParams: NavParams) {

      this.project = this.navParams.get('project');
      this.name = this.project.name;
      this.background = this.project.background;

    }

  ngOnInit() {}

  setBackgroundColor(color: any) {
    console.log(color);
    this.background = color.class;
  }


  isSelected(color: any) {
    return color.class === this.background ? 'active' : '';
  }

  finish(project){
    this.modalController.dismiss({
      name: this.name,
      background: this.background
    });
  }

}
