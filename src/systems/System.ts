import { SystemManager } from './SystemManager';

export class System {
    enabled: boolean = true;

    constructor(){
        SystemManager.registre(this);
    }
}