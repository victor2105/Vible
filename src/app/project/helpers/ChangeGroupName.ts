import { Command } from './Commad';
import { Group } from 'src/models/group';

export class ChangeGroupName implements Command {
    private group;
    before = '';
    after = '';
    
    constructor(group: Group, nName: string){
        this.group = group;
        this.before = group.name;
        this.after = nName;
    }

    do() {
        this.group.name = this.after;
    }

    undo() {
        this.group.name = this.before;
    }

    redo() {
        this.group.name = this.after;
    }


}