import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Project } from '../../models/project';
import { SumSystem } from 'src/systems/SumSystem';
import { Cel } from 'src/models/cel';
import { ReorderSystem } from 'src/systems/ReorderSystem';
import { ActivatedRoute, Router } from "@angular/router";
import { ModalEditCelPage } from './modal-edit-cel/modal-edit-cel.page';
import { ModalController, MenuController, IonInput } from '@ionic/angular';
import { Group } from 'src/models/group';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {
  
  project: Project;
  sumSystem: SumSystem;
  reorderSystem: ReorderSystem;

  selectedGroup;
  
  menuCreated = false;
  
  deleted = false;

  
  @ViewChild('appFocus') editGroupNameInput: IonInput;
  
  private focused: boolean = false;

  constructor(private menu: MenuController,
    private modalController: ModalController,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.sumSystem = new SumSystem();
    this.reorderSystem = new ReorderSystem();
  }

  async ngOnInit() {
    this.createMenu();
    const key = this.route.snapshot.params['id'];
    const value = await this.storage.get(key);
    this.project = JSON.parse(value);
    console.log(this.project);
    this.project.key = key;

    this.sumSystem.execute(this.project.list);
  }

  createMenu(){
    this.menuCreated = true;
  }

  newItem(group) {
    let cel = new Cel();
    cel.name = "Nova Célula";
    cel.value = 0;
    group.list.push(cel);

    this.sumSystem.execute([group]);
  }

  newGroup(){
    let group = new Group();
    group.name = "Novo";
    group.value = 0;
    this.project.list.push(group);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  save(){

    if(!this.deleted)
      this.storage.set(this.project.key, JSON.stringify(this.project));
  }

  ionViewWillLeave(){
    this.save();
  }

  // Menu
  openMenu() {
    this.menu.enable(true, 'project');
    this.menu.open('project');
  }

  loading = false;
  // Show Modal
  async editCel(cel: Cel, index, group: Group) {
    if(this.loading) return;
    this.loading = true;
    let modal = await this.modalController.create({
      component: ModalEditCelPage,
      componentProps: {
        cel: cel,
        index: index,
        group: group
      }
    });

    modal.onDidDismiss()
    .then(()=>{
      this.sumSystem.execute(this.project.list);
      this.save();
    });

    await modal.present();    
    this.loading = false;  
  }

  async deletarProject(){
    await this.storage.delete(this.project.key);
    this.deleted = true;
    this.router.navigate(['home']);
  }

  focus(){
    setTimeout(() => {
      if(this.editGroupNameInput){
        this.editGroupNameInput.setFocus();        
      }
    },150);
  }
}
