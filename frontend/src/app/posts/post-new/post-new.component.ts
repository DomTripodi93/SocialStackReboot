import { Component, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  id: number;
  canEdit = false;
  newPostForm: FormGroup;
  post: Post;

  constructor(
    private auth: AuthService,
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    let title = '';
    let body = '';

    this.newPostForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'body': new FormControl(body, Validators.required),
    });
  }

  onSubmit(){
    this.post = this.newPostForm.value;
    this.editPost(this.post);
  }

  editPost(data: Post) {
    this.postService.newPost(data).subscribe();
    this.router.navigate([".."], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate([".."], {relativeTo: this.route});
  }

}
