import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Project } from '../../models/project';
import { SumSystem } from 'src/systems/SumSystem';
import { Cel } from 'src/models/cel';
import { ReorderSystem } from 'src/systems/ReorderSystem';
import { ActivatedRoute, Router } from "@angular/router";
import { ModalEditCelPage } from './modal-edit-cel/modal-edit-cel.page';
import { ModalController, MenuController, IonInput, PopoverController } from '@ionic/angular';
import { Group } from 'src/models/group';
import { StorageService } from '../storage.service';
import { CommandManager } from './helpers/CommandManager';
import { CreateItem } from './helpers/CreateItem';
import { CreateGroup } from './helpers/CreateGroup';
import { ChangeGroupName } from './helpers/ChangeGroupName';
import { EditCel } from './helpers/EditCel';
import { DeleteCel } from './helpers/DeleteCel';
import { OptionsComponent } from './options/options.component';
import { DeleteGroup } from './helpers/DeleteGroup';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { EditProject } from './helpers/EditProject';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {
  
  project: Project;
  sumSystem: SumSystem;
  reorderSystem: ReorderSystem;
  public commandManager: CommandManager = new CommandManager();

  selectedGroup;
  
  menuCreated = false;
  
  deleted = false;

  
  @ViewChild('appFocus') editGroupNameInput: IonInput;
  
  private focused: boolean = false;

  constructor(private menu: MenuController,
    private modalController: ModalController,
    public popoverController: PopoverController,
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
    this.commandManager.execute(new CreateItem(group, this.sumSystem));
  }

  newGroup(){
    this.commandManager.execute(new CreateGroup(this.project));
  }

  changeGroupName(group, name){
    if(group.name == name) return;
    this.commandManager.execute(new ChangeGroupName(group, name));
  }

  undo(){
    this.commandManager.undo();
    this.save();
  }

  redo(){
    this.commandManager.redo();
    this.save();
  }

  async openGroupMenu(ev: any, index) {
    const popover = await this.popoverController.create({
      component: OptionsComponent,
      componentProps: {
        
        options: [{
          code: "archive",
          label: "Arquivar"
        }]
      },
      event: ev,
      translucent: true
    });

    popover.onDidDismiss()
    .then(data => {
      if(!data.data) return;
      if(data.data.code == "archive"){
        this.commandManager.execute(new DeleteGroup(index, this.project));
      }
    });

    return await popover.present();
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

  async editProject(){
    let modal = await this.modalController.create({
      component: EditProjectComponent,
      componentProps: {
        project: this.project
      }
    });

    modal.onDidDismiss()
    .then((data:any) =>{
      console.log(data);
      if(data.data == null) return;
      data = data.data;      
      this.commandManager.execute(new EditProject(this.project, data.name, data.background));
      this.save();
    });

    await modal.present();
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
    .then((data:any) =>{
      console.log(data);
      if(data.data == null) return;
      data = data.data;

      if(data.delete){
        this.commandManager.execute(new DeleteCel(data.index, data.group, this.sumSystem));
      }else{
        this.commandManager.execute(new EditCel(cel, data.cel, data.group, this.sumSystem));
      }

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
