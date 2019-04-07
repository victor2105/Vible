import { Group } from 'src/models/group';
import { System } from './System';

export class SumSystem extends System {

    public execute(groups: Array<Group>) {
        if(!this.enabled) return;

        groups.forEach(group => {
            let sum = 0;
            for(let i=0;i<group.list.length; i++) {
                sum+=group.list[i].value;
            }
            group.value = sum;
        });
    }
}