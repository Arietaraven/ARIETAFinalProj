import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { AuthService } from '../auth.service';
import { Post } from '../post.model';
import { FirebaseNotification } from '../post.model'; // Import FirebaseNotification

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: FirebaseNotification[] = []; // Change type to FirebaseNotification[]

  constructor(private notificationService: NotificationService, private authService: AuthService) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
        this.notifications = notifications;
      });
    }
  }

  markAsRead(notification: FirebaseNotification) { // Change type to FirebaseNotification
    this.notificationService.markAsRead(notification.id);
  }
}

    
