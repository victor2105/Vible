import { Command } from './Commad';
import { Cel } from 'src/models/cel';
import { SumSystem } from 'src/systems/SumSystem';
import { Group } from 'src/models/group';

export class EditCel implements Command {
    private cel;
    private originalValues;
    private newValues;

    private group;

    constructor(cel: Cel, ncel: Cel, group: Group, private sumSystem: SumSystem){
        this.cel = cel;
        this.originalValues = {
            name: cel.name,
            value: cel.value
        };
        this.newValues = {
            name: ncel.name,
            value: ncel.value
        };

        this.group = group;
    }

    do() {
        this.cel.name = this.newValues.name;
        this.cel.value = this.newValues.value;
        this.sumSystem.execute([this.group]);
    }
    
    undo() {
        this.cel.name = this.originalValues.name;
        this.cel.value = this.originalValues.value;
        this.sumSystem.execute([this.group]);
    }

    redo(){
        this.do();
    }


}