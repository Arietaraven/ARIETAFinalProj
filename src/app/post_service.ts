import { EventEmitter, Injectable } from "@angular/core";
import { Post } from "./post.model";


@Injectable({providedIn: 'root'})
export class PostService{
  listChangeEvent: EventEmitter<Post[]>  = new EventEmitter();

    listofposts: Post[]=[
    // new Post("tech crunch", "https://firstsiteguide.com/wp-content/uploads/2017/06/best-blog-examples.png", 
    // "We’ve created this article with a simple mission, to share with new bloggers some examples of successful and popular blogs on the web. Hopefully, these niche blog examples will motivate you to start your own blog The best blogs share,",
    // "John Raven Arieta",
    // new Date(),6,[],
    // ),
    
  ]
  
  getPost(){
    return this.listofposts;
  }
  deletebutton(index: number) {
    this.listofposts.splice(index, 1)
  }
  addPost(post: Post) {
    this.listofposts.push(post)
  }    
  updatePost(index: number, post: Post){
    this.listofposts[index]= post
  } 
  getSpecPost(index: number){
    return this.listofposts[index];
  } 
  LikePost(index: number){
    this.listofposts[index].numberOfLikes ++;
  }  
  addComment(index: number, comment: string) {
    this.listofposts[index].comments.push(comment);
  }
  setPost(newlistofpost:Post[]) {
    this.listofposts = newlistofpost;
    this.listChangeEvent.emit(newlistofpost);
  }
}
    
