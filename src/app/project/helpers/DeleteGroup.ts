import { Command } from './Commad';
import { Project } from 'src/models/project';

export class DeleteGroup implements Command {

    private project: Project;
    private index;
    private group;

    constructor(index: number, project: Project) {
        this.group = project.list[index];
        this.index = index;
        this.project = project;
    }

    do() {
        this.project.archived.push(this.group);
        this.project.list.splice(this.index, 1);
    }
    
    undo() {
        this.project.list.splice(this.index, 0, this.group);
        this.project.archived.pop();
    }
    
    redo() {
        this.do();
    }


}