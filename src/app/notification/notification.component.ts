import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { AuthService } from '../auth.service';
import { Post } from '../post.model';
import { FirebaseNotification } from '../post.model'; // Import FirebaseNotification
import { ChangeDetectorRef } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  // notifications: FirebaseNotification[] = []; // Change type to FirebaseNotification[]
  showNotifications = false; // This property controls the visibility of the dropdown
  @Input() notifications: FirebaseNotification[] =[];

  constructor(private notificationService: NotificationService, private authService: AuthService, private cd: ChangeDetectorRef) {}

  // ngOnInit() {
  //   const currentUser = this.authService.getCurrentUser();
  //   if (currentUser) {
  //     this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
  //       this.notifications = notifications;
  //     });
  //   }
  // }
  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      console.log('Getting notifications for user:', currentUser.uid); // Add this line
      this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
        console.log('Received notifications:', notifications); // Add this line
        this.notifications = notifications;
        this.cd.detectChanges(); // Manually trigger change detection
      });
    }
  }
  // ngOnInit() {
  //   const currentUser = this.authService.getCurrentUser();
  //   if (currentUser) {
  //     this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
  //       this.notifications = notifications;
  //     });
  //   }
  // }

  

  // markAsRead(notification: FirebaseNotification) { // Change type to FirebaseNotification
  //   this.notificationService.markAsRead(notification.id);
  // }
  markAsRead(notification: FirebaseNotification) {
    this.notificationService.markAsRead(notification.id);
  }
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    console.log('toggleNotifications called, showNotifications is now', this.showNotifications);
    console.log('Displayed notifications:', this.notifications);
  }
  // toggleNotifications() {
  //   this.showNotifications = !this.showNotifications;
  // }
  logNotifications() {
    console.log('Displayed notifications:', this.notifications);
  }
}

    
