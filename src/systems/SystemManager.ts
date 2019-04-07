import { System } from './System';

export class SystemManager {
    static systems:Map<string, System>;

    public static registre(sys: System){
        if(!SystemManager.systems){
            SystemManager.systems = new Map();
        }
        SystemManager.systems.set(sys.constructor.name, sys);
    }

    public static print(){
        SystemManager.systems.forEach((value, key) => {
            console.log(key+": "+value.enabled);
        });
    }
}