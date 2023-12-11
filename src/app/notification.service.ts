import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';
import { FirebaseNotification, Post } from "./post.model";
import { AuthService } from './auth.service'; // Import AuthService
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from "rxjs";
import { tap } from "rxjs";


@Injectable({ providedIn: 'root' })
export class NotificationService {
  
  private notifications: FirebaseNotification[] = [];
  private _notifications = new BehaviorSubject<FirebaseNotification[]>([]);
  public notifications$ = this._notifications.asObservable();

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  // createNotification(postId: string, userId: string, message: string) {
  //   let id = this.generateId();
  //   let uid = this.getUid();
  //   let read = false;
  //   let date = new Date();
    
  //   this._notifications.next(this.notifications);
  
  //   if (uid) {
  //     let notification = new FirebaseNotification(id, postId, userId, uid, message, read, date);
  //     this.firestore.collection('notifications').add(notification);
  //   } else {
  //     console.error("Cannot create notification: No current user");
  //   }
  // }
  // createNotification(postId: string, userId: string, message: string) {
  //   console.log('createNotification called with postId:', postId, 'userId:', userId, 'message:', message);
    
  //   let id = this.generateId();
  //   let uid = this.getUid();
  //   let read = false;
  //   let date = new Date();
  
  //   if (uid) {
  //     let notification = new FirebaseNotification(id, postId, userId, uid, message, read, date);
  //     notification = Object.assign({}, notification); // Convert to plain object
  //     this.firestore.collection('notifications').add(notification);
  
  //     // Add the new notification to the local array
  //     this.notifications.push(notification);
  
  //     console.log('Created notification:', notification); // Add this line
  //   } else {
  //     console.error("Cannot create notification: No current user");
  //   }
  // }
  createNotification(postId: string, userId: string, message: string) {
    let id = this.generateId();
    let uid = this.getUid();
    let read = false;
    let date = new Date();
  
    if (uid) {
      let notification = new FirebaseNotification(id, postId, userId, uid, message, read, date);
      notification = Object.assign({}, notification); // Convert to plain object
      this.firestore.collection('notifications').add(notification);
  
      // Add the new notification to the local array
      this.notifications.push(notification);
  
      // Save notifications to LocalStorage
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
  
      console.log('Created notification:', notification); 
    } else {
      console.error("Cannot create notification: No current user");
    }
  }
  
  // getNotifications(userId: string): Observable<FirebaseNotification[]> {
  //   return this.firestore.collection<FirebaseNotification>('notifications', ref => ref.where('userId', '==', userId)).valueChanges();
  // }


  // getNotifications(userId: string): Observable<FirebaseNotification[]> {
  //   return this.firestore.collection<FirebaseNotification>('notifications', ref => ref.where('uid', '==', userId)).valueChanges()
  //     .pipe(
  //       tap((notifications: FirebaseNotification[]) => console.log('Retrieved notifications:', notifications))
  //     );
  // }
  getNotifications(userId: string): Observable<FirebaseNotification[]> {
    return this.firestore.collection<FirebaseNotification>('notifications', ref => ref.where('userId', '==', userId)).valueChanges()
      .pipe(
        tap((notifications: FirebaseNotification[]) => {
          console.log('Retrieved notifications:', notifications);
          this._notifications.next(notifications); // Add this line
        })
      );
  }
  // getNotifications(userId: string): Observable<FirebaseNotification[]> {
  //   return this.firestore.collection<FirebaseNotification>('notifications', ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as FirebaseNotification;
  //       const id = a.payload.doc.id;
  //       return { ...data, id };
  //     }))
  //   );
  // }
  
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