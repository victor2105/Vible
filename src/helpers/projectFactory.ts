import { Project } from '../models/project';
import { Group } from '../models/group';

export class ProjectFactory {
    public createBasicProject(name) {
        let project = new Project(name);
        project.name = name;

        let groupEntradas = new Group();
        groupEntradas.name = 'Entradas';

        let groupSaidas = new Group();
        groupSaidas.name = 'Saídas';

        project.list.push(groupEntradas);
        project.list.push(groupSaidas);

        return project;
    }
}