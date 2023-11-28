import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from '../user.service';
// import { User } from '../post.model';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: string;
  password: string;

  constructor( private authService: AuthService, private router: Router) {
    this.username = '';
    this.password = '';
  }

//   signIn() {
//   const user: User = {
//     id: 1, // replace with actual id
//     name: 'some-name', // replace with actual name
//     username: this.username,
//     password: this.password
//   };
//   this.userService.login(user);
// }

// signIn() {
//   this.authService.signIn(this.username, this.password).then(() => {
//     this.router.navigate(['/post-list']); // replace '/post-list' with the route to your post list page
//     console.log(this.username)
//   });
// }
signIn() {
  this.authService.signIn(this.username, this.password).then((user) => {
    if (user) {
      console.log('User logged in:', user);
      this.router.navigate(['/post-list']); // replace '/post-list' with the route to your post list page
    } else {
      console.log('No user logged in');
    }
  });
}
}