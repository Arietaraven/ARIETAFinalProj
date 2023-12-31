import { EventEmitter, Injectable } from "@angular/core";
import { Post, Comment } from "./post.model";
import {Subject, Observable, retry } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { UserService } from './user.service'; // Import UserService
import { NotificationService } from './notification.service'; // Import NotificationService
import { User } from './post.model'; // Import User
import { FirebaseNotification } from "./post.model";


@Injectable({providedIn: 'root'})
export class PostService{
  listChangeEvent: EventEmitter<Post[]>  = new EventEmitter();

  private postsUpdated = new Subject<Post[]>();
    private postsCache: Post[] = [];
  posts: any;
  private postsByUser: { [key: string]: Post[] } = {}; // Add this line
  listofpostsUpdated = new Subject<Post[]>();
    

  constructor(private http: HttpClient, 
    private authService: AuthService, 
    private userService: UserService,
    private notificationService: NotificationService) {}

    listofposts: Post[]=[
    // new Post("tech crunch", "https://firstsiteguide.com/wp-content/uploads/2017/06/best-blog-examples.png", 
    // "We’ve created this article with a simple mission, to share with new bloggers some examples of successful and popular blogs on the web. Hopefully, these niche blog examples will motivate you to start your own blog The best blogs share,",
    // "John Raven Arieta",
    // new Date(),6,[],
    // ),
    // new Post("tech crunch", "https://firstsiteguide.com/wp-content/uploads/2017/06/best-blog-examples.png", 
    // "We’ve created this article with a simple mission, to share with new bloggers some examples of successful and popular blogs on the web. Hopefully, these niche blog examples will motivate you to start your own blog The best blogs share,",
    // "John Raven Arieta",
    // new Date(),6,[],
    // ),
    // new Post("tech crunch", "https://firstsiteguide.com/wp-content/uploads/2017/06/best-blog-examples.png", 
    // "We’ve created this article with a simple mission, to share with new bloggers some examples of successful and popular blogs on the web. Hopefully, these niche blog examples will motivate you to start your own blog The best blogs share,",
    // "John Raven Arieta",
    // new Date(),6,[],
    // ),

    
  ]
  


  getPost(userId: string) {
    return this.listofposts.filter(post => post.userId === userId);
}

getAllPosts(): Observable<Post[]> {
  return this.http.get<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json');
}


deletebutton(index: number): void {
  const post = this.listofposts[index];
  const currentUser = this.authService.getCurrentUser();
  if (currentUser && post.userId === currentUser.uid) {
    this.modifyPosts(() => this.listofposts.splice(index, 1));
  } else {
    console.error("You can't delete this post because you're not the author.");
    // Optionally, display a message to the user
  }
}

  // addPost(userId: string, post: Post) {
  //   post.userId = userId;
  //   post.postId = this.generateId(); // Add this line
  //   this.listofposts.push(post);
  //   this.listofpostsUpdated.next([...this.listofposts]);
  //   this.saveData(); // Save data after adding a post
  
  //   // Create a notification for each user
  //   this.authService.getUsers().subscribe((users: FirebaseNotification[]) => {
  //     users.forEach((user: FirebaseNotification) => {
  //       if (post.postId) {
  //         this.notificationService.createNotification(post.postId, user.uid, 'A new post has been created');
  //       }
  //     });
  //   });
  // }
  addPost(userId: string, post: Post) {
    post.userId = userId;
    post.postId = this.generateId(); // Add this line
    this.listofposts.push(post);
    this.listofpostsUpdated.next([...this.listofposts]);
    this.saveData(); // Save data after adding a post
  
    // Create a notification for each user
    this.authService.getUsers().subscribe((users: FirebaseNotification[]) => {
      users.forEach((user: FirebaseNotification) => {
        // Check if the user is not the one who created the post
        if (user.uid !== userId && post.postId) {
          this.notificationService.createNotification(post.postId, user.uid, 'A new post has been created');
        }
      });
    });
  }


  updatePost(index: number, post: Post){
    console.log('updatePost called with index:', index, 'and post:', post);
    this.listofposts[index] = post;
    this.saveData(); // Save data after updating a post
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
}

  getSpecPost(index: number){
    return this.listofposts[index];
  } 



LikePost(index: number){
  const post = this.listofposts[index];
  const currentUser = this.authService.getCurrentUser();
  if (currentUser) {
    post.likedByUsers = post.likedByUsers || [];
    if (post.likedByUsers.includes(currentUser.uid)) {
      // If the user has already liked the post, unlike it
      const userIndex = post.likedByUsers.indexOf(currentUser.uid);
      post.likedByUsers.splice(userIndex, 1);
      post.numberOfLikes--;
      console.log("You've unliked this post.");
    } else {
      // If the user hasn't liked the post, like it
      post.likedByUsers.push(currentUser.uid);
      post.numberOfLikes++;
      console.log("You've liked this post.");

      // Create a notification for the post's author
      if (post.userId !== currentUser.uid && post.postId && post.userId) {
        this.notificationService.createNotification(post.postId, post.userId, 'Someone liked your post');
      }
    }
    this.listChangeEvent.emit(this.listofposts);
    this.saveData();
  }
}

deleteComment(postIndex: number, commentIndex: number): void {
  if (this.listofposts && this.listofposts[postIndex] && this.listofposts[postIndex].comments) {
  this.modifyPosts(() => this.listofposts[postIndex].comments.splice(commentIndex, 1));
} else {
  console.error('Invalid postIndex or commentIndex');
}
}

deleteReply(postIndex: number, commentIndex: number, replyIndex: number): void {
  if (
    this.listofposts &&
    this.listofposts[postIndex] &&
    this.listofposts[postIndex].comments &&
    this.listofposts[postIndex].comments[commentIndex]
  ) {
    this.listofposts[postIndex].comments[commentIndex].commentReplies = this.listofposts[postIndex].comments[commentIndex].commentReplies || [];
    this.modifyPosts(() => this.listofposts[postIndex].comments[commentIndex].commentReplies.splice(replyIndex, 1));
  } else {
    console.error('Invalid postIndex, commentIndex, or replyIndex');
  }
}

addComment(index: number, comment: Comment, parentCommentIndex?: number) {
  const post = this.listofposts[index];

  if (post && post.comments) {
    if (parentCommentIndex !== undefined) {
      if (!post.comments[parentCommentIndex].commentReplies) {
        post.comments[parentCommentIndex].commentReplies = [];
      }
      post.comments[parentCommentIndex].commentReplies.push(comment);
    } else {
      post.comments.push(comment);
    }

    this.listChangeEvent.emit(this.listofposts);
    this.saveData();

    // Create a notification for the post's author
    const currentUser = this.authService.getCurrentUser();

    console.log('currentUser:', currentUser);
    console.log('post.userId:', post.userId);
    console.log('post.postId:', post.postId);

    if (currentUser && post.userId !== currentUser.uid && post.postId && post.userId) {
      console.log('postId:', post.postId);
      if (post.postId !== undefined) {
        const notification = new FirebaseNotification(
          this.generateId(),
          post.postId,
          post.userId,
          currentUser.uid,
          'Someone commented on your post',
          false,
          new Date()
        );
        this.notificationService.createNotification(notification.postId, notification.userId, notification.message);
      } else {
        console.error("post.postId is undefined");
      }
    }
  }
}


generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

likeComment(postIndex: number, commentIndex: number): void {
  const post = this.listofposts[postIndex];
  const comment = post.comments[commentIndex];
  const currentUser = this.authService.getCurrentUser();
  if (currentUser) {
    comment.likedByUsers = comment.likedByUsers || [];
    if (comment.likedByUsers.includes(currentUser.uid)) {
      // If the user has already liked the comment, unlike it
      const userIndex = comment.likedByUsers.indexOf(currentUser.uid);
      comment.likedByUsers.splice(userIndex, 1);
      comment.likes--;
      console.log("You've unliked this comment.");
    } else {
      // If the user hasn't liked the comment, like it
      comment.likedByUsers.push(currentUser.uid);
      comment.likes++;
      console.log("You've liked this comment.");

      // Create a notification for the post's author
      if (post.userId !== currentUser.uid && post.postId && post.userId) {
        this.notificationService.createNotification(post.postId, post.userId, 'Someone liked a comment on your post');
      }
    }
    this.listChangeEvent.emit(this.listofposts);
    this.saveData();
  }
}



likeReply(postIndex: number, commentIndex: number, replyIndex: number): void {
  const post = this.listofposts[postIndex];
  const comment = post.comments[commentIndex];
  const reply = comment.commentReplies[replyIndex];
  const currentUser = this.authService.getCurrentUser();
  if (currentUser) {
    reply.likedByUsers = reply.likedByUsers || [];
    if (reply.likedByUsers.includes(currentUser.uid)) {
      // If the user has already liked the reply, unlike it
      const userIndex = reply.likedByUsers.indexOf(currentUser.uid);
      reply.likedByUsers.splice(userIndex, 1);
      reply.likes--;
      console.log("You've unliked this reply.");
    } else {
      // If the user hasn't liked the reply, like it
      reply.likedByUsers.push(currentUser.uid);
      reply.likes++;
      console.log("You've liked this reply.");
    }
    this.listChangeEvent.emit(this.listofposts);
    this.saveData();
  }
}

  setPost(newlistofpost:Post[]) {
    this.listofposts = newlistofpost;
    this.listChangeEvent.emit(newlistofpost);
  }

  private modifyPosts(modification: () => void): void {
    modification();
    this.postsUpdated.next([...this.listofposts]);
    this.saveData();
  }

//   saveData(): void {
//     this.authService.user$.subscribe(user => {
//         if (user) {
//             this.http.put<Post[]>(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/${user.uid}/post.json`, this.postsByUser[user.uid])
//                 .pipe(retry(3))
//                 .subscribe({
//                     next: () => console.log('Data saved successfully'),
//                 });
//         }
//     });
// }

  // saveData(): void {
  //   this.authService.user$.subscribe(user => {
  //     if (user) {
  //       this.http.put<Post[]>(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/${user.uid}/post.json`, this.listofposts)
  //         .pipe(retry(3))
  //         .subscribe({
  //           next: () => console.log('Data saved successfully'),
  //         });
  //     }
  //   });
  // }
  saveData(): void {
    this.http.put('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json', this.listofposts)
      .pipe(retry(3))
      .subscribe({
        next: () => console.log('Data saved successfully'),
      });
  }
}  
  
