import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from '../user.service';
import { User } from '../post.model';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string;
  password: string;

  constructor( private authService: AuthService, private router: Router) {
    this.username = '';
    this.password = '';
  }

  // signUp() {
  //   const user: User = {
  //     id: 1, // replace with actual id
  //     name: 'some-name', // replace with actual name
  //     username: this.username,
  //     password: this.password
  //   };
  //   this.userService.register(user);
  // }

  // signUp() {
  //   this.authService.signUp(this.username, this.password);
  //   console.log(this.username)
  // }
  signUp() {
    this.authService.signUp(this.username, this.password).then(() => {
      this.router.navigate(['/sign-in']); // replace '/sign-in' with the route to your sign-in page
      console.log(this.username)
    });
  } 
}