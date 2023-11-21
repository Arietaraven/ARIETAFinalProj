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
  comment: string = '';
  parentCommentIndex?: number;
  replyingTo: any;
  replyComment: string;
  postIndex!: number;
  replyIndex!: number;





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

  // deleteReply(index: number,commentIndex: number, i: number, replyIndex: number){
  //   this.postService.deleteReply(this.index, commentIndex, replyIndex);
  // }

addComment(index: number, comment: string, parentCommentIndex?: number) {
  if (comment && this.replyingTo !== null) {
    const newComment: Comment = { text: comment, commentReplies: [], likes: 0  };
    this.postService.addComment(index, newComment, parentCommentIndex);
    this.comment = ''; // Reset the comment input
    this.replyingTo = null; // Reset replyingTo after replying
  } else if (comment) {
    const newComment: Comment = { text: comment, commentReplies: [], likes: 0  };
    this.postService.addComment(index, newComment);
    this.comment = ''; // Reset the comment input
  }
}


setParentCommentIndex(commentIndex: number | undefined) {
  this.replyingTo = commentIndex;
}

likeComment(postIndex: number, commentIndex: number): void {
  this.postService.likeComment(postIndex, commentIndex);
}

  likeReply(postIndex: number, commentIndex: number, replyIndex: number): void {
    const reply = this.post?.comments[commentIndex]?.commentReplies[replyIndex];
    if (reply) {
      this.postService.likeReply(postIndex, commentIndex, replyIndex);
    }
  }
}

