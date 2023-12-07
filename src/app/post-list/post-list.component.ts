
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post_service';
import { BackEndService } from '../back-end.service';
import { AuthService } from '../auth.service';
import { HttpClient } from "@angular/common/http";
import { retry } from 'rxjs/operators';
import { FirebaseNotification } from '../post.model';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  index=0
listofposts: Post[]=[];
searchTerm: string = '';
notifications: FirebaseNotification[] = [];
// showNotifications: boolean = false;

constructor(
  private postService: PostService,
  private backEndService :BackEndService,
  private http: HttpClient,
  private authService: AuthService,
  private notificationService: NotificationService
){
  // const currentUser = this.authService.getCurrentUser();
  //     if (currentUser) {
  //       this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
  //         this.notifications = notifications;
  //       });
  //     }
}


// ngOnInit() {
//   this.authService.user$.subscribe(user => {
//     if (user) {
//       this.http.get<Post[]>(`https://crud-b-8f2ce-default-rtdb.firebaseio.com/${user.uid}/post.json`)
//         .pipe(retry(3))
//         .subscribe(posts => {
//           this.listofposts = posts;
//         });
//     }
//   });
// }


ngOnInit(): void {
  const currentUser = this.authService.getCurrentUser();
  if (currentUser) {
    this.notificationService.notifications$.subscribe((notifications: FirebaseNotification[]) => {
      this.notifications = notifications;
    });
  }
  this.backEndService.fetchData().subscribe((posts: Post[]) => {
    this.listofposts = posts;
    this.postService.setPost(posts); 
  });
}
// ngOnInit(): void {
//   const currentUser = this.authService.getCurrentUser();
//   if (currentUser) {
//     this.notificationService.notifications$.subscribe((notifications: FirebaseNotification[]) => {
//       this.notifications = notifications;
//     });
//   }
//   this.backEndService.fetchData().subscribe((posts: Post[]) => {
//     this.listofposts = posts;
//     this.postService.setPost(posts); 
//   });
// }
// ngOnInit(): void{

// this.backEndService.fetchData().subscribe((posts: Post[]) => {
//   this.listofposts = posts;
//   this.postService.setPost(posts); // assuming setPost method exists in your PostService
// });
// }
get filteredPosts(): Post[] {
  const filteredPosts = this.listofposts.filter((post) =>
  post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  console.log(filteredPosts);
  return filteredPosts;
}
logSearchTerm() {
  console.log(this.searchTerm);
}

// markAsRead(notification: FirebaseNotification) {
//   this.notificationService.markAsRead(notification.id);
// }

// toggleNotifications() {
//   this.showNotifications = !this.showNotifications;
//   console.log('toggleNotifications called, showNotifications is now', this.showNotifications);
// }

}