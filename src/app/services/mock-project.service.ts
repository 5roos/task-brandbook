import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../modules/project.model';

@Injectable({
  providedIn: 'root'
})
export class MockProjectService {

  constructor() { }

  private mockProjects: Project[] = [
    { id: 1, name: 'Project Alpha', description: 'First Project' },
    { id: 2, name: 'Project Beta', description: 'Second Project' },
  ];

  private projectsSubject = new BehaviorSubject<Project[]>(this.mockProjects);
  projects$ = this.projectsSubject.asObservable();

  public add(project: Project) {
    project.id = Date.now();
    this.mockProjects.push(project);
    this.projectsSubject.next(this.mockProjects);
  }

  public update(project: Project) {
    const index = this.mockProjects.findIndex(p => p.id === project.id);
    if (index > -1) {
      this.mockProjects[index] = project;
      this.projectsSubject.next(this.mockProjects);
    }
  }

  public delete(id: number) {
    this.mockProjects = this.mockProjects.filter(p => p.id !== id);
    this.projectsSubject.next(this.mockProjects);
  }

}
