import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  selectedProject;
  constructor(private storage: StorageService) { }

  async delete(){
    await this.storage.delete(this.selectedProject);
  }
}
