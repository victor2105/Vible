import { Command } from './Commad';
import { Project } from 'src/models/project';
import { Group } from 'src/models/group';

export class CreateGroup implements Command {
    private project;
    private group;
    constructor(project: Project){
        this.project = project;
    }
    
    do() {
        let group = new Group();
        group.name = "Novo";
        group.value = 0;
        this.group = group;
        this.project.list.push(group);
    }

    undo() {
        this.project.list.pop();
    }

    redo() {
        this.project.list.push(this.group);
    }
}