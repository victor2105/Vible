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
        
        this.undone.length = 0;
        this.t2 = 0;
    }

    undo() {
        if(this.t == 0) return 0;
        console.log(`Undo ${this.t}`)

        let command = this.done[this.t-1];
        this.t--;
        
        command.undo();

        console.log(command.class);


        this.undone[this.t2] = command;
        this.t2++;
        return 1;
    }

    redo(){
        if(this.t2 == 0) return 0;

        console.log(`Redo ${this.t2}`)

        let command = this.undone[this.t2-1];
        this.t2--;

        console.log(command.class);

        command.redo();
        this.done[this.t] = command;
        this.t++;
    }

    canUndo(){
        return this.t > 0;
    }

    canRedo() {
        return this.t2 > 0;
    }
}