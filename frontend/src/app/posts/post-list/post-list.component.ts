import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../posts.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  postsHold: Post[] = [];
  posts = []
  isFetching = false;
  isError = false;
  error = '';
  subscription: Subscription;

  constructor(
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchPosts();
  }


  fetchPosts() {
    this.isFetching = true;
    this.subscription = this.postService.fetchPosts()
    .subscribe(posts => {
      this.postsHold = posts;
      this.posts = posts;
      console.log(this.postsHold);
      this.isFetching = false;
    }, error => {
      this.isFetching = false;
      this.isError = true;
      this.error = error.message
    });
  }

  newPost(){
    this.router.navigate(["new"], {relativeTo: this.route})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
