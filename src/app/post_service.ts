import { EventEmitter, Injectable } from "@angular/core";
import { Post } from "./post.model";
import {Subject, Observable, retry } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class PostService{
  listChangeEvent: EventEmitter<Post[]>  = new EventEmitter();

  private postsUpdated = new Subject<Post[]>();
    private postsCache: Post[] = [];
    

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
  // deletebutton(index: number) {
  //   this.listofposts.splice(index, 1)
  // }
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
  // LikePost(index: number){
  //   this.listofposts[index].numberOfLikes ++;
  // }  
  LikePost(index: number){
    this.listofposts[index].numberOfLikes++;
    this.listChangeEvent.emit(this.listofposts);
    this.saveData();
}
  // addComment(index: number, comment: string) {
  //   this.listofposts[index].comments.push(comment);
  // }

//   addComment(index: number, comment: string){
//     if (this.listofposts[index] && this.listofposts[index].comments) {
//         this.listofposts[index].comments.push(comment);
//         this.listChangeEvent.emit(this.listofposts);
//         this.saveData();
//     }
// }


addComment(index: number, comment: string, parentCommentIndex?: number) {
  if (this.listofposts[index] && this.listofposts[index].comments) {
    if (parentCommentIndex !== undefined) {
      // Adding a reply to a specific comment
      this.listofposts[index].comments[parentCommentIndex].commentReplies.push({
        text: comment,
        commentReplies: []
      });
    } else {
      // Adding a top-level comment
      this.listofposts[index].comments.push({
        text: comment,
        commentReplies: []
      });
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
  saveData(): void {
    this.http.put<Post[]>('https://crud-b-8f2ce-default-rtdb.firebaseio.com/post.json', this.listofposts)
        .pipe(retry(3))
        .subscribe({
            next: () => console.log('Data saved successfully'),
        });
}
}  
  
