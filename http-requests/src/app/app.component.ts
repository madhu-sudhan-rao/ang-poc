import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub : Subscription

  constructor(
    private http: HttpClient,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.onFetchPosts()
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage
    })
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    this.postsService.createAndStorePosts(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isFetching = true
    // Send Http request
    this.postsService.fetchPosts().subscribe(
      (posts) =>{
        // console.log(posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error =>{
        this.isFetching = false;
        this.error = error.error.error;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    })
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }

}
