import { Command } from './Commad';
import { Project } from 'src/models/project';

export class DeleteGroup implements Command {

    private project: Project;
    private index;
    private group;
    private archivedIndex;

    constructor(index: number, project: Project) {
        this.group = project.list[index];
        this.index = index;
        this.project = project;
    }

    do() {
        this.project.archived.push(this.group);
        this.archivedIndex = this.project.archived.length-1;
        this.project.list.splice(this.index, 1);
    }
    
    undo() {
        throw new Error("Method not implemented.");
    }
    
    redo() {
        throw new Error("Method not implemented.");
    }


}