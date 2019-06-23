import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: number;
  canEdit = false;
  newPostForm: FormGroup;
  post: Post;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private postService: PostsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.id = +params['id'];
      this.postService.id = params['id']
    });
    this.postService.fetchPost(this.id)
    .subscribe(posts => {
      this.post = posts[0];
      this.initForm();
      if (this.post.user_id == this.auth.user) {
        this.canEdit = true;
      };
    });
  }

  private initForm() {
    let title = this.post.title;
    let body = this.post.body;

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
    this.postService.changePost(data).subscribe();
    this.router.navigate([".."], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate([".."], {relativeTo: this.route});
  }

}
