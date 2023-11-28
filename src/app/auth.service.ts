import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User, UserInfo  } from 'firebase/auth';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();


  constructor(private firebaseAuth: AngularFireAuth) { 
    this.firebaseAuth.authState.pipe(
      map(user => user ? { ...user, providerData: user.providerData.filter(pd => pd !== null) as UserInfo[] } : null)
    ).subscribe(user => this._user$.next(user));
  }

  async signIn(email: string, password: string): Promise<User | null> {
    const credential = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
    if (credential.user) {
      const user = {
        ...credential.user,
        providerData: credential.user.providerData.filter(pd => pd !== null) as UserInfo[]
      };
      this._user$.next(user);
      return user;
    }
    return null;
  } 
  // async signIn(email: string, password: string): Promise<User | null> {
  //   const credential = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
  //   if (credential.user) {
  //     return {
  //       ...credential.user,
  //       providerData: credential.user.providerData.filter(pd => pd !== null) as UserInfo[]
  //     };
  //   }
  //   return null;
  // }
  // async signIn(email: string, password: string) {
  //   await this.firebaseAuth.signInWithEmailAndPassword(email, password);
  // }

  async signUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  async signOut() {
    await this.firebaseAuth.signOut();
  }

  getCurrentUser() {
    const auth = getAuth();
    return auth.currentUser;
  }
}

