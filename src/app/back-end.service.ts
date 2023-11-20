import { Injectable } from '@angular/core';
import { PostService } from './post_service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {
  constructor(private postService:PostService, private http:HttpClient) { }

  saveData(){
    const newlistofpost: Post[] =this.postService.getPost();
    this.http.put('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json',
    newlistofpost)
    .subscribe((res)=>{
      console.log(res);
    })
  }
  // fetchData(){
  //    this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
  //   .pipe(tap((newlistofpost: Post[])=>{
  //     console.log(newlistofpost)
  //     this.postService.setPost(newlistofpost);
  //   })
  //   ).subscribe();
  // }
  // fetchData(){
  //   return this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
  //   .pipe(tap((newlistofpost: Post[])=>{
  //     console.log(newlistofpost)
  //     this.postService.setPost(newlistofpost);
  //   }));
  // }

  fetchData() {
    return this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
      .pipe(
        tap((newlistofpost: Post[]) => {
          console.log(newlistofpost);
  
          // Ensure each post has comments array and date object
          newlistofpost.forEach(post => this.ensurePostHasCommentsArrayAndDateObject(post));
  
          this.postService.setPost(newlistofpost);
        })
      );
  }
  
  // Function to ensure post has comments array and date object
  ensurePostHasCommentsArrayAndDateObject(post: Post) {
    if (!post.comments) {
      post.comments = []; // Ensure there's a comments array
    }

  }


}
