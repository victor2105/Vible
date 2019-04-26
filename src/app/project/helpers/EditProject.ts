import { Command } from './Commad';
import { Project } from '../../../models/project';

export class EditProject implements Command {

    private project;
    private beforName;
    private beforBackground;

    private afterName;
    private afterBackground;

    constructor(project: Project, name, background){
        this.project = project;
        this.beforName = project.name;
        this.beforBackground = project.background;

        this.afterName = name;
        this.afterBackground = background;
    }

    do() {
        this.project.name = this.afterName;
        this.project.background = this.afterBackground;
    }
    undo() {
        this.project.name = this.beforName;
        this.project.background = this.beforBackground;
    }
    redo() {
        this.do();
    }


}