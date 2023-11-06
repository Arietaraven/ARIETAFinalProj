
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post_service';
import { BackEndService } from '../back-end.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  index=0
listofposts: Post[]=[];
constructor(
  private postService: PostService,
  private backEndService :BackEndService
){}

ngOnInit(): void{
  this.listofposts = this.postService.getPost();
  this.postService.listChangeEvent.subscribe((post:Post[]) =>{
    this.listofposts = post;
  })
}
}
  // this.backEndService.fetchData().subscribe((posts: Post[]) => {
  //   this.listofposts = posts;
  //   this.postService.setPost(posts); // assuming setPost method exists in your PostService
  // });