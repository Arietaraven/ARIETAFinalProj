import { Component } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseNotification } from '../post.model';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  notifications: FirebaseNotification[] = [];
  showNotifications = false; // Add this line


  constructor(private backEndService:BackEndService, 
    public authService: AuthService, 
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
          this.notifications = notifications;
        });
      }
    }
    
  
    ngOnInit() {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
          this.notifications = notifications;
          console.log('notifications:', this.notifications);
        });
      }
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
