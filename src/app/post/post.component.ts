import { Component, Input, OnInit } from '@angular/core';
import { Post, Comment } from '../post.model';
import { PostService } from '../post_service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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





  constructor(private postService: PostService, 
    private router: Router,
    private authService: AuthService) {
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
    const post = this.postService.getSpecPost(this.index);
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && post.userId === currentUser.uid) {
      this.router.navigate(['/post-edit', this.index]);
    } else {
      console.error("You can't edit this post because you're not the author.");
      // Optionally, display a message to the user
    }
  }
  // onEdit() {
  // this.router.navigate(['/post-edit', this.index]);
  // }
  onClick() {
    this.postService.LikePost(this.index);
  }
  
  deleteReply(index: number, commentIndex: number, replyIndex: number) {
  this.postService.deleteReply(index, commentIndex, replyIndex);
}

deleteComment(commentIndex: number) {
  this.postService.deleteComment(this.index, commentIndex);
}
//   deleteReply(commentIndex: number, replyIndex: number) {
//     this.postService.deleteReply(this.index, commentIndex, replyIndex);
// }

//   deleteReply(postId: string, commentIndex: number, replyIndex: number) {
//     const postRef = this.afs.doc(`posts/${postId}`);
//     postRef.get().subscribe(doc => {
//         if (doc.exists) {
//             let post = doc.data() as Post;
//             post.comments[commentIndex].replies.splice(replyIndex, 1);
//             postRef.update(post);
//         }
//     });
// }


addComment(index: number, comment: string, parentCommentIndex?: number) {
  if (comment && this.replyingTo !== null) {
    const newComment: Comment = { text: comment, commentReplies: [], likes: 0, replies: [] };
    this.postService.addComment(index, newComment, parentCommentIndex);
    this.comment = ''; // Reset the comment input
    this.replyingTo = null; // Reset replyingTo after replying
  } else if (comment) {
    const newComment: Comment = { text: comment, commentReplies: [], likes: 0, replies: [] };
    this.postService.addComment(index, newComment);
    this.comment = ''; // Reset the comment input
  }
}

// addComment(index: number, comment: string, parentCommentIndex?: number) {
//   if (comment && this.replyingTo !== null) {
//     const newComment: Comment = { text: comment, commentReplies: [], likes: 0 };
//     this.postService.addComment(index, newComment, parentCommentIndex);
//     this.comment = ''; // Reset the comment input
//     this.replyingTo = null; // Reset replyingTo after replying
//   } else if (comment) {
//     const newComment: Comment = { text: comment, commentReplies: [], likes: 0  };
//     this.postService.addComment(index, newComment);
//     this.comment = ''; // Reset the comment input
//   }
// }


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

