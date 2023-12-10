import { Component, Input, OnInit } from '@angular/core';
import { Post, Comment, User } from '../post.model';
import { PostService } from '../post_service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';



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
    private authService: AuthService,
    private route: ActivatedRoute) {
    this.replyComment = '';
  }
    @Input() index: number = 0;
    @Input() post?: Post;


    currentUser: any;

  
    ngOnInit(): void {
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.post);
      console.log(this.post?.imgPath); // This will print the image URL to the console
      console.log(this.currentUser); // This will print the current user to the console
      console.log(this.post?.comments); // This will print the comments to the console
    
      this.authService.user$.subscribe(user => {
        if (user) {
          console.log('User is authenticated');
        } else {
          console.log('User is not authenticated');
        }
      });
    

      const postId = this.route.snapshot.paramMap.get('id');
      console.log('postId:', postId);
      if (postId) {
        this.postService.getAllPosts().subscribe(posts => {
          const post = posts.find(p => p.postId === postId);
          if (post) {
            console.log('Fetched post data:', post); // Check the fetched post data
            this.post = post;
          } else {
            console.error('Post not found!');
          }
        }, error => {
          console.error('Error fetching posts:', error); // Log any errors
        });
      }

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

  onClick() {
    this.postService.LikePost(this.index);
  }
  hasUserLikedPost(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return this.post?.likedByUsers?.includes(currentUser?.uid || '') || false;
  }
  hasUserLikedComment(commentIndex: number): boolean {
    const currentUser = this.authService.getCurrentUser();
    const comment = this.post?.comments[commentIndex];
    return comment?.likedByUsers?.includes(currentUser?.uid || '') || false;
  }
  
  hasUserLikedReply(commentIndex: number, replyIndex: number): boolean {
    const currentUser = this.authService.getCurrentUser();
    const reply = this.post?.comments[commentIndex]?.commentReplies[replyIndex];
    return reply?.likedByUsers?.includes(currentUser?.uid || '') || false;
  }
  
  deleteReply(index: number, commentIndex: number, replyIndex: number) {
  this.postService.deleteReply(index, commentIndex, replyIndex);
}

deleteComment(commentIndex: number) {
  this.postService.deleteComment(this.index, commentIndex);
}




// addComment(index: number, commentText: string, parentCommentIndex?: number) {
//   const currentUser = this.authService.getCurrentUser();
//   if (currentUser && commentText) {
//     const newComment: Comment = { text: commentText, commentReplies: [], likes: 0, replies: [], userId: currentUser.uid };
//     this.postService.addComment(index, newComment, parentCommentIndex);
//     this.comment = ''; 
//     this.replyingTo = null;

//     this.newCommentText = ''; // Clear the input field
//     this.commentingOn = null; // Hide the input field
//   }
// }
// addComment(index: number, commentText: string, parentCommentIndex?: number) {
//   const currentUser = this.authService.getCurrentUser();
//   if (currentUser && commentText) {
//     const newComment: Comment = { text: commentText, commentReplies: [], likes: 0, replies: [], userId: currentUser.uid };
//     this.postService.addComment(index, newComment, parentCommentIndex);
//     this.comment = ''; 
//     this.replyingTo = null;
//     this.commentingOn = undefined;
//     this.newCommentText = ''; // Clear the input field
//     console.log('Comment added, commentingOn set to null');
//   } else {
//     console.log('Comment not added, currentUser or commentText is missing');
//   }
// }
// addComment(index: number, commentText: string, parentCommentIndex?: number) {
//   const currentUser = this.authService.getCurrentUser();

//   if (currentUser && commentText) {
//     const newComment: Comment = { text: commentText, commentReplies: [], likes: 0, replies: [], userId: currentUser.uid };

//     if (this.post) {
//       if (parentCommentIndex !== undefined) {
//         const parentComment = this.post.comments[parentCommentIndex];
//         if (parentComment && !parentComment.commentReplies) {
//           parentComment.commentReplies = [];
//         }
//         parentComment.commentReplies.push(newComment);
//       } else {
//         this.post.comments.push(newComment);
//       }

//       this.comment = '';
//       this.replyingTo = null;
//       this.commentingOn = undefined;
//       this.newCommentText = ''; // Clear the input field
//       console.log('Comment added, commentingOn set to null');
      
//       // ... (rest of your code)

//     } else {
//       console.error('Post not found');
//     }
//   } else {
//     console.log('Comment not added, currentUser or commentText is missing');
//   }
// }



addComment(index: number, commentText: string, parentCommentIndex?: number) {
  const currentUser = this.authService.getCurrentUser();
  if (currentUser && commentText) {
    const newComment: Comment = { text: commentText, commentReplies: [], likes: 0, replies: [], userId: currentUser.uid };
    this.postService.addComment(index, newComment, parentCommentIndex);
    this.comment = ''; 
    this.replyingTo = null;
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


likeComment(commentIndex: number): void {
  this.postService.likeComment(this.index, commentIndex);
}



  likeReply(postIndex: number, commentIndex: number, replyIndex: number): void {
    const reply = this.post?.comments[commentIndex]?.commentReplies[replyIndex];
    if (reply) {
      this.postService.likeReply(postIndex, commentIndex, replyIndex);
    }
  }
}

