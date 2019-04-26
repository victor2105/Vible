import { Command } from './Commad';
import { Group } from 'src/models/group';
import { Cel } from 'src/models/cel';

export class CreateItem implements Command{

    private group: Group;
    private cel;

    constructor(group: Group, private sumSystem: any){
        this.group = group;
    }

    do() {
        let cel = new Cel();
        cel.name = "Nova Célula";
        cel.value = 0;
        this.cel = cel;
        this.group.list.push(cel);
        this.sumSystem.execute([this.group]);
    }
    
    undo() {
        this.group.list.pop();
        this.sumSystem.execute([this.group]);
    }

    redo(){
        this.group.list.push(this.cel);
        this.sumSystem.execute([this.group]);
    }

}