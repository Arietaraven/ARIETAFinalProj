import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { FirebaseNotification, Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // ...

  constructor(private post: Post) {}

  createNotification( postId: string, userId: string, message: string) {
    // Create a new notification and save it to your database
    // ...
  }

  getNotifications(userId: string): Observable<FirebaseNotification[]> {
    // Retrieve all notifications for the given user
    // ...
  
    const notifications: FirebaseNotification[] = [];
    // Fill the notifications array with the retrieved notifications
  
    return of(notifications); // Wrap the notifications array in an Observable
  }

  markAsRead(notificationId: string) {
    // Mark a notification as read
    // ...
  }

  // ...
}