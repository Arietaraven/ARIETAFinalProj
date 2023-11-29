import { Component } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private backEndService:BackEndService, 
    public authService: AuthService, 
    public router: Router,
    private activatedRoute: ActivatedRoute ) {}
  
  ngOnInit(): void {

  }

  onsave() {
    this.backEndService.saveData();
  }
  onfetch(){
    this.backEndService.fetchData();
  }

  // onLogout() {
  //   this.authService.logout().then(() => {
  //     // Navigate to the login page after successfully logging out
  //     this.router.navigate(['/sign-in']);
  //   }).catch((error) => {
  //     // Handle any errors from the logout process
  //     console.error('Error logging out:', error);
  //   });
  // }

    onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/sign-in']);
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  }
}
