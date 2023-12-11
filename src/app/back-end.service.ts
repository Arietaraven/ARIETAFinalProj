import { Injectable } from '@angular/core';
import { PostService } from './post_service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Subject, throwError } from 'rxjs'; // Add this import at the top of your file
import { catchError } from 'rxjs/operators'; // Add this import at the top of your file
import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';


interface PostsResponse {
  [key: string]: Post;
}

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  postsChanged = new Subject<void>();
  
  constructor(private postService:PostService, private http:HttpClient, private authService: AuthService) { }

  // saveData(){
  //   const newlistofpost: Post[] =this.postService.getPost();
  //   this.http.put('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json',
  //   newlistofpost)
  //   .subscribe((res)=>{
  //     console.log(res);
  //   })
  // }


  
  // ...
  // saveData(post?: Post) {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     console.log('User ID:', userId);
  //     if (post) {
  //       // If a Post object is provided, update the specific post
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/post/${post.postId}.json`, post)
  //         .pipe(
  //           catchError(error => {
  //             console.error('Error saving post:', error);
  //             return throwError(error);
  //           })
  //         )
  //         .subscribe((res) => {
  //           console.log(res);
  //         });
  //     } else {
  //       // If no Post object is provided, save all posts
  //       const newlistofpost: Post[] = this.postService.getPost(userId);
  //       console.log('Posts:', newlistofpost);
  //       newlistofpost.forEach(post => {
  //         this.http.post(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/post/${userId}.json`, post)
  //           .pipe(
  //             catchError(error => {
  //               console.error('Error saving post:', error);
  //               return throwError(error);
  //             })
  //           )
  //           .subscribe((res) => {
  //             console.log(res);
  //           });
  //       });
  //     }
  //   } else {
  //     // handle the case when user is null
  //   }
  // }
  saveData(post?: Post) {
    const user = this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      console.log('User ID:', userId);
      if (post) {
        // If a Post object is provided, update the specific post
        this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/post/${post.postId}.json`, post)
          .pipe(
            catchError(error => {
              console.error('Error saving post:', error);
              return throwError(error);
            })
          )
          .subscribe((res) => {
            console.log(res);
            this.postsChanged.next(); // Emit that the posts have changed
          });
      } else {
        // If no Post object is provided, save all posts
        const newlistofpost: Post[] = this.postService.getPost(userId);
        console.log('Posts:', newlistofpost);
        newlistofpost.forEach(post => {
          this.http.post(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/post/${userId}.json`, post)
            .pipe(
              catchError(error => {
                console.error('Error saving post:', error);
                return throwError(error);
              })
            )
            .subscribe((res) => {
              console.log(res);
              this.postsChanged.next(); // Emit that the posts have changed
            });
        });
      }
    } else {
      // handle the case when user is null
    }
  }





  fetchData() {
    return this.http.get<PostsResponse>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
      .pipe(
        map((responseData: PostsResponse) => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key] });
            }
          }
          return postsArray;
        }),
        tap((newlistofpost: Post[]) => {
          console.log(newlistofpost);
  
          // Ensure each post has comments array and date object
          if (Array.isArray(newlistofpost)) {
            newlistofpost.forEach(post => this.ensurePostHasCommentsArrayAndDateObject(post));
          } else {
            console.error('newlistofpost is not an array:', newlistofpost);
          }
  
          this.postService.setPost(newlistofpost);
        })
      );
  }

  
  // Function to ensure post has comments array and date object
  ensurePostHasCommentsArrayAndDateObject(post: Post) {
    if (post) {
      // post.comments = []; 
      post.comments = post.comments || [];// Ensure there's a comments array
    }else {
      console.error('Post is null');
  

  }


}
}