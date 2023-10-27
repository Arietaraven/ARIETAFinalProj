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


  saveDate(){
    const newlistofpost: Post[] =this.postService.getPost();
    this.http.put('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json',
    newlistofpost)
    .subscribe((res)=>{
      console.log(res);
    })
  }
  // fetchData(){
  //   return this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
  //   .pipe(tap((newlistofpost: Post[])=>{
  //     console.log(newlistofpost)
  //     this.postService.setPost(newlistofpost);
  //   })
  //   ).subscribe();
  // }
  fetchData(){
    return this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
    .pipe(tap((newlistofpost: Post[])=>{
      console.log(newlistofpost)
      this.postService.setPost(newlistofpost);
    }));
  }
}
