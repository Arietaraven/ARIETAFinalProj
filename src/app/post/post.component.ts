import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post_service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  memberName = "lan"
  comment: string = '';



  constructor(private postService: PostService, private router: Router) {

  }
    @Input() index: number = 0;
    @Input() post?: Post;
    comments: string = '';
   
  ngOnInit(): void {
    console.log(this.post);
  }
  delete() {
    this.postService.deletebutton(this.index);
  }
  onEdit() {
  this.router.navigate(['/post-edit', this.index]);
  }
  onClick() {
    this.postService.LikePost(this.index);
  }
  addComment() {
    if (this.comment)
    this.postService.addComment(this.index, this.comment);
    this.comment = '';
  }
}
