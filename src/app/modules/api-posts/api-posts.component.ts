import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiPostService, Post } from 'src/app/services/api-post.service';

@Component({
  selector: 'app-api-posts',
  templateUrl: './api-posts.component.html',
  styleUrls: ['./api-posts.component.scss']
})
export class ApiPostsComponent {

  posts: Post[] = [];
  postForm!: FormGroup;
  editing = false;
  currentId: number | null = null;

  constructor(private fb: FormBuilder, private api: ApiPostService) {
    this.postForm = this.fb.group({
      title: [''],
      body: [''],
    });
  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  public fetchPosts() {
    this.api.getPosts().subscribe(data => (this.posts = data.slice(0, 5)));
  }

  public onSubmit() {
    const post = this.postForm.value;
    if (this.editing && this.currentId) {
      this.api.updatePost({ id: this.currentId, ...post }).subscribe(() => {
        this.fetchPosts();
        this.reset();
      });
    } else {
      this.api.addPost({ ...post, userId: 1 }).subscribe(() => {
        this.fetchPosts();
        this.reset();
      });
    }
  }

  public edit(post: Post) {
    this.editing = true;
    this.currentId = post.id!;
    this.postForm.patchValue(post);
  }

  public delete(id: number) {
    this.api.deletePost(id).subscribe(() => this.fetchPosts());
  }

  private reset() {
    this.postForm.reset();
    this.editing = false;
    this.currentId = null;
  }

  public clearForm(){
    this.reset();
  }


}
