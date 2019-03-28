import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {
  groupList: Array<{name: string; value: number; cels?:any[]}> = [];
  constructor() {
    this.addGroup();
    this.addGroup();
  }

  ngOnInit() {
    
  }

  addGroup(){
    const g = {
      name: 'Group',
      value: 4.55,
      cels: []
    }

    for(let i=0;i<11;i++){
      g.cels.push({
        name: 'Cel',
        value: 4.55
      });
    }

    this.groupList.push(g);
  }

}
