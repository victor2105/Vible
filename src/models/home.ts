import { ReorderList } from '../helpers/reorder';
import { Project } from './project';

export class Home extends ReorderList {
    
    constructor(){
        super(new Array<Project>());
    }
}