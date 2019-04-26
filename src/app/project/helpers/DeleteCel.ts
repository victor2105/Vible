import { Command } from './Commad';
import { Group } from 'src/models/group';
import { SumSystem } from 'src/systems/SumSystem';

export class DeleteCel implements Command {

    private index;
    private cel;
    private group: Group;
    

    constructor(index: number, group: Group, private sumSystem: SumSystem) {
        this.index = index;
        this.cel = group.list[index];
        this.group = group;
    }

    do() {
        this.group.list.splice(this.index, 1);
        this.sumSystem.execute([this.group]);
    }
    undo() {
        this.group.list.splice(this.index, 0, this.cel);
        this.sumSystem.execute([this.group]);
    }
    redo() {
        this.do();
    }


}