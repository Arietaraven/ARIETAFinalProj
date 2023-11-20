import { Component, Input, OnInit } from '@angular/core';
import { Post, Comment } from '../post.model';
import { PostService } from '../post_service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  comments: { text: string, commentReplies: { text: string, likes: number }[] }[] = [];
  commentIndex: number= 0;
  memberName = "lan"
  // comments: {commentReplies: any; text: string }[] = [];
  comment: string = '';
  parentCommentIndex?: number;
  replyingTo: any;
  replyComment: string;





  constructor(private postService: PostService, private router: Router,) {
    this.replyComment = '';
  }
    @Input() index: number = 0;
    @Input() post?: Post;


   
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
  
  deleteComment(commentIndex: number) {
    this.postService.deleteComment(this.index, commentIndex);
  }

  likeReply(commentIndex: number, replyIndex: number) {
    this.comments[commentIndex].commentReplies[replyIndex].likes++;
}

  setParentCommentIndex(commentIndex: number) {
    this.replyingTo = commentIndex;
  }


  addComment(index: number, comment: string, parentCommentIndex?: number) {
    if (comment && this.replyingTo !== null) {
      const newComment: Comment = { text: comment, commentReplies: [] };
      this.postService.addComment(index, newComment, parentCommentIndex);
      this.comment = ''; // Reset the comment input
      this.replyingTo = null; // Reset replyingTo after replying
    } else if (comment) {
      const newComment: Comment = { text: comment, commentReplies: [] };
      this.postService.addComment(index, newComment);
      this.comment = ''; // Reset the comment input
    }
  }
  





// post.component.ts
// addComment(index: number, comment: string) {
//   if (comment && this.replyingTo !== null) {
//     const newComment: Comment = { text: comment, commentReplies: [] };
//     this.postService.addComment(index, newComment, this.replyingTo);
//     this.comment = ''; // Reset the comment input
//     this.replyingTo = null; // Reset replyingTo after replying
//   } else if (comment) {
//     const newComment: Comment = { text: comment, commentReplies: [] };
//     this.postService.addComment(index, newComment);
//     this.comment = ''; // Reset the comment input
//   }
// }

  }
  

  // addComment() {
  //   if (this.comment)
  //   this.postService.addComment(this.index, this.comment);
  //   this.comment = '';
  // }

