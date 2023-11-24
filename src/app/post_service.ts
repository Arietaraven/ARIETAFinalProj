import { EventEmitter, Injectable } from "@angular/core";
import { Post, Comment } from "./post.model";
import {Subject, Observable, retry } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class PostService{
  listChangeEvent: EventEmitter<Post[]>  = new EventEmitter();

  private postsUpdated = new Subject<Post[]>();
    private postsCache: Post[] = [];
  posts: any;
    

  constructor(private http: HttpClient) {}

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
  
  getPost(){
    return this.listofposts;

  }

  deletebutton(index: number): void {
    this.modifyPosts(() => this.listofposts.splice(index, 1));
}
  addPost(post: Post) {
    this.listofposts.push(post)
  }    
  updatePost(index: number, post: Post){
    this.listofposts[index]= post
  } 
  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
}

  getSpecPost(index: number){
    return this.listofposts[index];
  } 

  LikePost(index: number){
    this.listofposts[index].numberOfLikes++;
    this.listChangeEvent.emit(this.listofposts);
    this.saveData();
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

// deleteReply(postIndex: number, commentIndex: number, replyIndex: number) {
//   if (
//     this.posts?.comments &&
//     this.posts.comments[commentIndex] &&
//     this.posts.comments[commentIndex].commentReplies
//   ) {
//     this.posts.comments[commentIndex].commentReplies.splice(replyIndex, 1);
//     // Call a service method here to update the data on the server, if necessary
//   }
// }

// deleteReply(postIndex: number, commentIndex: number, replyIndex: number) {
//   if (
//     this.listofposts &&
//     this.listofposts[postIndex] &&
//     this.listofposts[postIndex].comments &&
//     this.listofposts[postIndex].comments[commentIndex] &&
//     this.listofposts[postIndex].comments[commentIndex].commentReplies
//   ) {
//     this.listofposts[postIndex].comments[commentIndex].commentReplies.splice(replyIndex, 1);
//     this.listChangeEvent.emit(this.listofposts);
//     this.saveData();
//   }
// }

addComment(index: number, comment: Comment, parentCommentIndex?: number) {
  if (this.listofposts[index] && this.listofposts[index].comments) {
    if (parentCommentIndex !== undefined) {
      if (!this.listofposts[index].comments[parentCommentIndex].commentReplies) {
        this.listofposts[index].comments[parentCommentIndex].commentReplies = [];
      }
      this.listofposts[index].comments[parentCommentIndex].commentReplies.push(comment);
    } else {
      this.listofposts[index].comments.push(comment);
    }
    this.listChangeEvent.emit(this.listofposts);
    this.saveData();
  }
}
likeComment(postIndex: number, commentIndex: number): void {
  if (this.listofposts && this.listofposts[postIndex] && this.listofposts[postIndex].comments) {
    const comment = this.listofposts[postIndex].comments[commentIndex];
    if (comment) {
      comment.likes = (comment.likes || 0) + 1;
      this.listChangeEvent.emit(this.listofposts);
      this.saveData();
    }
  }
}

likeReply(postIndex: number, commentIndex: number, replyIndex: number): void {
  if (
    this.listofposts &&
    this.listofposts[postIndex] &&
    this.listofposts[postIndex].comments &&
    this.listofposts[postIndex].comments[commentIndex] &&
    this.listofposts[postIndex].comments[commentIndex].commentReplies
  ) {
    const reply = this.listofposts[postIndex].comments[commentIndex].commentReplies[replyIndex];
    if (reply) {
      reply.likes = (reply.likes || 0) + 1;
      this.listChangeEvent.emit(this.listofposts);
      this.saveData();
    }
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
  saveData(): void {
    this.http.put<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json', this.listofposts)
        .pipe(retry(3))
        .subscribe({
            next: () => console.log('Data saved successfully'),
        });
}
}  
  
