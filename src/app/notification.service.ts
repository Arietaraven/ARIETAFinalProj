import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { FirebaseNotification, Post } from "./post.model";
import { AuthService } from './auth.service'; // Import AuthService
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  
  private notifications: FirebaseNotification[] = [];

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  createNotification(postId: string, userId: string, message: string) {
    let id = this.generateId();
    let uid = this.getUid();
    let read = false;
    let date = new Date();
  
    if (uid) {
      let notification = new FirebaseNotification(id, postId, userId, uid, message, read, date);
      this.firestore.collection('notifications').add(notification);
    } else {
      console.error("Cannot create notification: No current user");
    }
  }

  getNotifications(userId: string): Observable<FirebaseNotification[]> {
    return this.firestore.collection<FirebaseNotification>('notifications', ref => ref.where('userId', '==', userId)).valueChanges();
  }
  // getNotifications(userId: string): Observable<FirebaseNotification[]> {
  //   return this.firestore.collection<FirebaseNotification>('notifications', ref => ref.where('userId', '==', userId)).valueChanges();
  // }
  // getNotifications(userId: string): Observable<FirebaseNotification[]> {
  //   const userNotifications = this.notifications.filter(notification => notification.userId === userId);
  //   console.log('Getting notifications:', userNotifications);
  //   return of(userNotifications);
  // }

  markAsRead(notificationId: string) {
    // Find the notification with the given ID
    const notification = this.notifications.find(n => n.id === notificationId);
  
    // If the notification exists, mark it as read
    if (notification) {
      notification.read = true;
    } else {
      console.error(`Cannot mark notification as read: No notification found with ID ${notificationId}`);
    }
  }

  private generateId(): string {
    // This is a very basic way to generate a unique ID and might not be suitable for your needs.
    // You should replace this with your own ID generation logic.
    return Math.random().toString(36).substring(2);
  }

  private getUid(): string | null {
    const user = this.authService.getCurrentUser();
    return user ? user.uid : null;
  }
}