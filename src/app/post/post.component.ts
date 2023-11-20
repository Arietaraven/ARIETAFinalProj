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

  commentIndex: number= 0;
  memberName = "lan"
  comment: string = '';
  parentCommentIndex?: number;
  replyingTo: any;
  replyComment: string;




  constructor(private postService: PostService, private router: Router,) {
    this.replyComment = '';
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

// post.component.ts
addComment(index: number, comment: string, commentIndex: number | undefined) {
  if (comment && this.parentCommentIndex !== undefined) {
    this.postService.addComment(index, comment, this.parentCommentIndex);
    this.comment = ''; // Reset the comment input
    this.parentCommentIndex = undefined; // Reset parentCommentIndex after replying
  } else if (comment) {
    this.postService.addComment(index, comment, commentIndex);
    this.comment = ''; // Reset the comment input
  }
}




setParentCommentIndex(commentIndex: number) {
  this.parentCommentIndex = commentIndex;
}

  }
  

  // addComment() {
  //   if (this.comment)
  //   this.postService.addComment(this.index, this.comment);
  //   this.comment = '';
  // }

