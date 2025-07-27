import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MockProjectService } from 'src/app/services/mock-project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectForm!: FormGroup;
  projects: Project[] = [];
  editing = false;
  currentId: number | null = null;

   constructor(private fb: FormBuilder, private service: MockProjectService) {
    this.projectForm = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.service.projects$.subscribe(data => (this.projects = data));
  }

  public onSubmit() {
    const value = this.projectForm.value;
    if (this.editing && this.currentId) {
      this.service.update({ id: this.currentId, ...value });
    } else {
      this.service.add(value);
    }
    this.editing = false;
    this.projectForm.reset();
  }

  public edit(project: Project) {
    this.editing = true;
    this.currentId = project.id;
    this.projectForm.patchValue(project);
  }

  public delete(id: number) {
    this.service.delete(id);
  }

  public clearForm(){
    this.projectForm.reset();
    this.editing = false;
    this.currentId = null;
  }

}
