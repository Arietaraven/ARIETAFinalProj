// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { User } from './post.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   currentUser = this.currentUserSubject.asObservable();

//   register(user: User) {
//     // Implement your registration logic here
//     this.currentUserSubject.next(user);
//   }

//   login(user: User) {
//     // Implement your login logic here
//     this.currentUserSubject.next(user);
//   }

//   logout() {
//     // Implement your logout logic here
//     this.currentUserSubject.next(null);
//   }
// }
