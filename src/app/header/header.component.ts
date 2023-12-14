import { Component } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseNotification } from '../post.model';
import { NotificationService } from '../notification.service';
import { NotificationComponent } from '../notification/notification.component';
import { ChatService } from '../chat.service'; // Import ChatService
import { Message } from '../chat.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  notifications: FirebaseNotification[] = [];
  showNotifications = false; // Add this line
  users: any[];
  chats: any[] = []; // Add this line
  unreadMessageCount: number = 0;


  constructor(private backEndService:BackEndService, 
    public authService: AuthService, 
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private chatService: ChatService) {
      const currentUser = this.authService.getCurrentUser();
if (currentUser && currentUser.email) {
  this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
    this.notifications = notifications;
  });

        this.chatService.getChats(currentUser.email).subscribe(chats => {
          this.chats = chats;
        });
      }
      this.users = [];
    }
    
  
    // ngOnInit() {
    //   const currentUser = this.authService.getCurrentUser();
    //   if (currentUser) {
    //     this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
    //       this.notifications = notifications;
    //     });
    //   }
    //   this.authService.getUsers().subscribe(users => {
    //     console.log('Users:', users);
    //     this.users = users;
    //   });
    // }
    ngOnInit() {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
          this.notifications = notifications;
        });
    
        if (currentUser.email) {
          this.chatService.getUnreadNotifications(currentUser.email).subscribe((messages: Message[]) => {
            console.log('Unread messages:', messages);
            this.unreadMessageCount = messages.length;
          });
    
          // Add this code to subscribe to chats
          this.chatService.getChats(currentUser.email).subscribe(chats => {
            this.chats = chats;
            console.log('Chats:', this.chats); // Add this line
          });
        }
      }
    
      this.authService.getUsers().subscribe(users => {
        console.log('Users:', users);
        this.users = users;
      });
    }
  onsave() {
    this.backEndService.saveData();
  }
  onfetch(){
    this.backEndService.fetchData();
  }

  // onLogout() {
  //   this.authService.logout().then(() => {
  //     // Navigate to the login page after successfully logging out
  //     this.router.navigate(['/sign-in']);
  //   }).catch((error) => {
  //     // Handle any errors from the logout process
  //     console.error('Error logging out:', error);
  //   });
  // }

    onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/sign-in']);
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  }
  markAsRead(notification: FirebaseNotification) {
    this.notificationService.markAsRead(notification.id);
  }
  

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    console.log('toggleNotifications called, showNotifications is now', this.showNotifications);
  }

  
}
