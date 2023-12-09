import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<string>()

  constructor(
    private http: HttpClient
  ) { }

  createAndStorePosts(title: string, content: string){
    const postData: Post = {title: title, content: content}
    this.http.post(
      'https://angular-firebase-2-e9201-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response',
        responseType: 'json'
      }
    ).subscribe(
      (responseData) =>{
        console.log(responseData);
        this.fetchPosts()
      }, error => {
        this.error.next(error.error.error)
      }
    )
  }

  fetchPosts(){
    let searchParams = new HttpParams()
    searchParams = searchParams.append('name','madhu')
    searchParams = searchParams.append('age','21')
    return this.http
      .get<{[key: string]: Post}>(
        'https://angular-firebase-2-e9201-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Headers': 'Hello', 'Name': 'Madhu'}),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(map((responseData) =>{
        const postsArray: Post[] =[];
        for (const key in responseData) {
          if(responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key], id: key})
          }
        }
        return postsArray;
      }),
        catchError( errorRes =>{
          return throwError(errorRes);
        })
      );
  }

  deletePosts(){
    return this.http
      .delete(
        'https://angular-firebase-2-e9201-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events',
          responseType: 'text'
        }
      ).pipe(
        tap(event => {
          console.log(event)
          if(event.type === HttpEventType.Sent){

          }
          if(event.type === HttpEventType.Response){
            console.log(event.body)
          }
        })
      );
  }
}
