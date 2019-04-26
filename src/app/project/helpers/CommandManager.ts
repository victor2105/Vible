import { Command } from './Commad';

export class CommandManager {
    private t = 0;
    private done = [];

    private t2 = 0;
    private undone = [];

    execute(command: Command){
        command.do();
        this.done[this.t] = command;
        this.t++;
    }

    undo() {
        if(this.t == 0) return 0;
        let command = this.done[this.t-1];
        this.t--;
        command.undo();
        this.undone[this.t2] = command;
        this.t2++;
        return 1;
    }

    redo(){
        if(this.t2 == 0) return 0;
        let command = this.undone[this.t2-1];
        this.t2--;
        this.execute(command);
    }

    canUndo(){
        return this.t > 0;
    }

    canRedo() {
        return this.t2 > 0;
    }
}