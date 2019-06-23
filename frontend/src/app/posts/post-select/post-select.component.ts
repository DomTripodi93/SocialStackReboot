import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-select',
  templateUrl: './post-select.component.html',
  styleUrls: ['./post-select.component.css']
})
export class PostSelectComponent implements OnInit {
  isFetching = false;
  isError = false;
  id= "";
  user_id = '';
  posts: Post[] = [];
  post: Post;
  error = '';
  myPost = false;
  editTitle = false;
  editBody = false;
  subscription: Subscription;
  subscription2: Subscription;


  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
    ) { }

  ngOnInit() {
    this.subscription2 = this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.getPost();
    });
    this.subscription = this.auth.authChanged.subscribe(
      ()=>{
        this.id = this.auth.user
      }
    )
  }

  getPost() {
    this.isFetching = true;
    this.postsService.fetchPost(this.id)
      .subscribe(post => {
        this.posts = post;
        this.isFetching = false;
        this.post = this.posts[0];
        this.user_id = this.posts[0].user_id;
        if (this.user_id == this.auth.user) {
          this.myPost = true;
        };
      }, error => {
        this.isFetching = false;
        this.isError = true;
        this.error = error.message
      })
  }  

  titleEdit(){
    this.editTitle = true;
  }

  subTitle(){
    this.editTitle = false;
  }

  bodyEdit(){
    this.editBody = true;
  }

  subBody(){
    this.editBody = false;
  }


  editPost(){
    this.router.navigate(["edit"], {relativeTo: this.route})
  }
  
  newPost(){
    this.router.navigate(["../new"], {relativeTo: this.route})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
