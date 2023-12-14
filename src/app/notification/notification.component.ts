import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { AuthService } from '../auth.service';
import { Post } from '../post.model';
import { FirebaseNotification } from '../post.model'; // Import FirebaseNotification
import { ChangeDetectorRef } from '@angular/core';
import { Input } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  // notifications: FirebaseNotification[] = []; // Change type to FirebaseNotification[]
  showNotifications = false; // This property controls the visibility of the dropdown
  @Input() notifications: FirebaseNotification[] =[];
  unreadNotificationsCount!: number; // Add this line

  constructor(private notificationService: NotificationService, private authService: AuthService, private cd: ChangeDetectorRef) {}

  // ngOnInit() {
  //   const currentUser = this.authService.getCurrentUser();
  //   if (currentUser) {
  //     this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
  //       this.notifications = notifications;
  //     });
  //   }
  // }
  // ngOnInit() {
  //   const currentUser = this.authService.getCurrentUser();
  //   if (currentUser) {
  //     console.log('Getting notifications for user:', currentUser.uid); // Add this line
  //     this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
  //       console.log('Received notifications:', notifications); // Add this line
  //       this.notifications = notifications;
  //       this.cd.detectChanges(); // Manually trigger change detection
  //     });
  //   }
  // }
  // ngOnInit() {
  //   const currentUser = this.authService.getCurrentUser();
  //   if (currentUser) {
  //     console.log('Getting notifications for user:', currentUser.uid); // Add this line
  //     this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
  //       console.log('Received notifications:', notifications); // Add this line
  //       this.notifications = notifications;
  //       this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length; // Update the count here
  //       this.cd.detectChanges(); // Manually trigger change detection
  //     });
  //   }
  // }
  // ngOnInit() {
  //   const currentUser = this.authService.getCurrentUser();
  //   console.log('Current user:', currentUser); // Add this line
  //   if (currentUser) {
  //     this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
  //       this.notifications = notifications;
  //       this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length; // Update the count here
  //       this.cd.detectChanges();
  //     });
  //   }
  //     // Load notifications from LocalStorage
  // const storedData = JSON.parse(localStorage.getItem('notifications') || '{}');
  // console.log('Stored data:', storedData); // Add this line
  // if (currentUser && storedData.userId === currentUser.uid) {
  //   this.notifications = storedData.notifications;
  //   this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length;
  // }
  // }
  // ngOnInit() {
  //   this.authService.getAuthState().subscribe((user: User | null) => {
  //     if (user) {
  //       this.notificationService.getNotifications(user.uid).subscribe((notifications: FirebaseNotification[]) => {
  //         this.notifications = notifications;
  //         this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length;
  //         this.cd.detectChanges();
  //       });
  //     }
  //     // Load notifications from LocalStorage
  //     const storedData = JSON.parse(localStorage.getItem('notifications') || '{}');
  //     console.log('Stored data:', storedData); // Add this line
  //     if (user && storedData.userId === user.uid) {
  //       this.notifications = storedData.notifications;
  //       this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length;
  //     }
  //   });
  // }
  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.notificationService.getNotifications(currentUser.uid).subscribe((notifications: FirebaseNotification[]) => {
        this.notifications = notifications;
        this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length;
        this.cd.detectChanges();
      });
    } else {
      // Load notifications from LocalStorage
      const storedNotifications = localStorage.getItem('notifications');
      if (storedNotifications) {
        this.notifications = JSON.parse(storedNotifications);
        this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length;
      }
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
  // markAsRead(notification: FirebaseNotification) {
  //   this.notificationService.markAsRead(notification.id);
  // }
  // markAsRead(notification: FirebaseNotification) {
  //   this.notificationService.markAsRead(notification.id);
  //   const index = this.notifications.findIndex(n => n.id === notification.id);
  //   if (index !== -1) {
  //     this.notifications.splice(index, 1);
  //   }
  // }
  // markAsRead(notification: FirebaseNotification) {
  //   this.notificationService.markAsRead(notification.id);
  //   const index = this.notifications.findIndex(n => n.id === notification.id);
  //   if (index !== -1) {
  //     this.notifications.splice(index, 1);
  //   }
  //   this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length; // Add this line
  // }
  // markAsRead(notification: FirebaseNotification) {
  //   this.notificationService.markAsRead(notification.id);
  //   if (!notification.read) {
  //     this.unreadNotificationsCount--; // Decrease the count of unread notifications
  //     notification.read = true; // Mark the notification as read
  //   }
  // }
  
markAsRead(notification: FirebaseNotification) {
  this.notificationService.markAsRead(notification.id);
  if (!notification.read) {
    notification.read = true; // Mark the notification as read
    this.unreadNotificationsCount--; // Decrease the count of unread notifications
  }
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

    
