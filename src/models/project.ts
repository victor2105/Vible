import { Group } from './group';
import { ReorderList } from '../helpers/reorder';

export class Project {
    public key: string;
    public name: string;
    public list: Group[] = [];
    public archived: Group[] = [];

    public background?: string;

    constructor(name = ''){
        this.name = name;
    }
}