import { Group } from './group';
import { ReorderList } from '../helpers/reorder';

export class Project {
    public key: string;
    public name: string;
    public list: Group[] = [];
    constructor(name = ''){
        this.name = name;
    }
}