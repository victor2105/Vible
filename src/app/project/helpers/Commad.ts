export interface Command {
    do ();

    undo();
    
    redo();
}