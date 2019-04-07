import { ReorderList } from 'src/helpers/reorder';
import { System } from './System';

export class ReorderSystem extends System {

    public execute(reorder: ReorderList, ev) {
        if(!this.enabled) return;
        
        if(ev.detail.to >= reorder.list.length){
            ev.detail.to = reorder.list.length - 1;
        }
        if(ev.detail.to <= 0){
            ev.detail.to = 0;
        }

        reorder.list = this.reorderArray(reorder.list, ev.detail.from, ev.detail.to);

        ev.detail.complete();
    }

    private reorderArray(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing purposes
    };
}