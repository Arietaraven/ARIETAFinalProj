import { Injectable } from '@angular/core';
import { PostService } from './post_service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs'; // Add this import at the top of your file
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
            });
        });
      }
    } else {
      // handle the case when user is null
    }
  }


  // saveData(post?: Post) {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     console.log('User ID:', userId);
  //     if (post) {
  //       // If a Post object is provided, add it to the user's posts
  //       this.http.post(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts/${userId}.json`, post)
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
  //         this.http.post(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts/${userId}.json`, post)
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
  // saveData(post?: Post) {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     console.log('User ID:', userId);
  //     if (post) {
  //       // If a Post object is provided, update the specific post
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts/${post.postId}.json`, post)
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
  //         this.http.post(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts/${userId}.json`, post)
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






  // saveData(post?: Post) {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     console.log('User ID:', userId);
  //     if (post) {
  //       // If a Post object is provided, update the specific post
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts/${post.postId}.json`, post)
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
  //       const postsObject = newlistofpost.reduce((obj: { [key: string]: Post }, post) => {
  //         const postId = post.postId || this.generateUniqueId(); // Generate a unique ID if postId is undefined
  //         obj[postId] = post;
  //         return obj;
  //       }, {});
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts.json`, postsObject)
  //         .pipe(
  //           catchError(error => {
  //             console.error('Error saving posts:', error);
  //             return throwError(error);
  //           })
  //         )
  //         .subscribe((res) => {
  //           console.log(res);
  //         });
  //     }
  //   } else {
  //     // handle the case when user is null
  //   }
  // }
  
  // generateUniqueId(): string {
  //   return new Date().getTime().toString();
  // }



  // saveData(post?: Post) {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     console.log('User ID:', userId);
  //     if (post) {
  //       // If a Post object is provided, update the specific post
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts/${post.postId}.json`, post)
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
  //       const postsObject = newlistofpost.reduce((obj: { [key: string]: Post }, post) => {
  //         obj[post.postId] = post;
  //         return obj;
  //       }, {});
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts.json`, postsObject)
  //         .pipe(
  //           catchError(error => {
  //             console.error('Error saving posts:', error);
  //             return throwError(error);
  //           })
  //         )
  //         .subscribe((res) => {
  //           console.log(res);
  //         });
  //     }
  //   } else {
  //     // handle the case when user is null
  //   }
  // }




  // saveData(post?: Post) {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     console.log('User ID:', userId);
  //     if (post) {
  //       // If a Post object is provided, update the specific post
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json`, post)
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
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json`, newlistofpost)
  //         .pipe(
  //           catchError(error => {
  //             console.error('Error saving posts:', error);
  //             return throwError(error);
  //           })
  //         )
  //         .subscribe((res) => {
  //           console.log(res);
  //         });
  //     }
  //   } else {
  //     // handle the case when user is null
  //   }
  // }


  // saveData(post?: Post) {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     console.log('User ID:', userId);
  //     if (post) {
  //       // If a Post object is provided, update the specific post
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts/.json`, post)
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
  //       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts.json`, newlistofpost)
  //         .pipe(
  //           catchError(error => {
  //             console.error('Error saving posts:', error);
  //             return throwError(error);
  //           })
  //         )
  //         .subscribe((res) => {
  //           console.log(res);
  //         });
  //     }
  //   } else {
  //     // handle the case when user is null
  //   }
  // }
// saveData(post?: Post) {
//   const user = this.authService.getCurrentUser();
//   if (user) {
//     const userId = user.uid;
//     console.log('User ID:', userId);
//     if (post) {
//       // If a Post object is provided, update the specific post
//       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts/${userId}.json`, post)
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
//       this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/posts/${userId}.json`, newlistofpost)
//         .pipe(
//           catchError(error => {
//             console.error('Error saving posts:', error);
//             return throwError(error);
//           })
//         )
//         .subscribe((res) => {
//           console.log(res);
//         });
//     }
//   } else {
//     // handle the case when user is null
//   }
// }

  // saveData() {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     console.log('User ID:', userId);
  //     const newlistofpost: Post[] = this.postService.getPost(userId);
  //     console.log('Posts:', newlistofpost);
  
  //     // First, fetch the existing posts
  //     this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
  //       .pipe(
  //         catchError(error => {
  //           console.error('Error fetching posts:', error);
  //           return throwError(error);
  //         })
  //       )
  //       .subscribe((existingPosts: Post[]) => {
  //         // Append the new posts to the existing posts
  //         const updatedPosts = [...existingPosts, ...newlistofpost];
  
  //         // Save the updated list of posts back to Firebase
  //         this.http.put('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json', updatedPosts)
  //           .pipe(
  //             catchError(error => {
  //               console.error('Error saving posts:', error);
  //               return throwError(error);
  //             })
  //           )
  //           .subscribe((res) => {
  //             console.log(res);
  //           });
  //       });
  //   } else {
  //     // handle the case when user is null
  //   }
  // }




  // saveData() {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     console.log('User ID:', userId);
  //     const newlistofpost: Post[] = this.postService.getPost(userId);
  //     console.log('Posts:', newlistofpost);
  //     // this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/${userId}/post.json`, newlistofpost)
  //     this.http.put('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json', newlistofpost)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error saving posts:', error);
  //         return throwError(error);
  //       })
  //     )
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  //   } else {
  //     // handle the case when user is null
  //   }
  // }

  // saveData() {
  //   const userId = this.authService.getCurrentUser().uid; // Get current user's ID
  //   const newlistofpost: Post[] = this.postService.getPost(userId);
  //   this.http.put(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/${userId}/post.json`, newlistofpost)
  //   .subscribe((res) => {
  //     console.log(res);
  //   });
  // }

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



  // fetchData() {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     const userId = user.uid;
  //     return this.http.get<Post[]>(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/${userId}/post.json`)
  //       .pipe(
  //         tap((newlistofpost: Post[]) => {
  //           console.log(newlistofpost);
    
  //           // Ensure each post has comments array and date object
  //           newlistofpost.forEach(post => this.ensurePostHasCommentsArrayAndDateObject(post));
    
  //           this.postService.setPost(newlistofpost);
  //         })
  //       );
  //   } else {
  //     // Return an empty Observable when user is null
  //     return of([]);
  //   }
  // }


  // fetchData() {
  //   return this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
  //     .pipe(
  //       tap((newlistofpost: Post[]) => {
  //         console.log(newlistofpost);
  
  //         // Ensure each post has comments array and date object
  //         if (newlistofpost) {
  //           newlistofpost.forEach(post => this.ensurePostHasCommentsArrayAndDateObject(post));
  //         }
  
  //         this.postService.setPost(newlistofpost);
  //       })
  //     );
  // }
  // fetchData() {
  //   return this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
  //     .pipe(
  //       tap((newlistofpost: Post[]) => {
  //         console.log(newlistofpost);
  
  //         // Ensure each post has comments array and date object
  //         if (Array.isArray(newlistofpost)) {
  //           newlistofpost.forEach(post => this.ensurePostHasCommentsArrayAndDateObject(post));
  //         } else {
  //           console.error('newlistofpost is not an array:', newlistofpost);
  //         }
  
  //         this.postService.setPost(newlistofpost);
  //       })
  //     );
  // }


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
  // fetchData() {
  //   return this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
  //     .pipe(
  //       tap((newlistofpost: Post[]) => {
  //         console.log(newlistofpost);
  
  //         // Ensure each post has comments array and date object
  //         if (Array.isArray(newlistofpost)) {
  //           newlistofpost.forEach(post => this.ensurePostHasCommentsArrayAndDateObject(post));
  //         } else {
  //           console.error('newlistofpost is not an array:', newlistofpost);
  //         }
  
  //         this.postService.setPost(newlistofpost);
  //       })
  //     );
  // }
  // fetchData() {
  //   return this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json')
  //     .pipe(
  //       tap((newlistofpost: Post[]) => {
  //         console.log(newlistofpost);
  
          
  //         newlistofpost.forEach(post => this.ensurePostHasCommentsArrayAndDateObject(post));
  
  //         this.postService.setPost(newlistofpost);
  //       })
  //     );
  // }
  
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