import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service'; // Adjust the path according to your project structure

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  message = '';
  otherUserEmail: string = '';
  currentUserEmail: string = ''; // Add this line

  constructor(private chatService: ChatService, private route: ActivatedRoute, private authService: AuthService) { 
    this.otherUserEmail = '';
  }

  // ngOnInit(): void {
  //   this.otherUserEmail = this.route.snapshot.paramMap.get('email') || '';
  //   let userEmail = '';
  //   const currentUser = this.authService.getCurrentUser();
  //   if (currentUser && currentUser.email) {
  //     userEmail = currentUser.email;
  //   }
    
  //   if (userEmail && this.otherUserEmail) {
  //     this.chatService.getMessages(userEmail, this.otherUserEmail).subscribe(messages => {
  //       this.messages = messages;
  //     });
  //   } else {
  //     console.error('Both userEmail and otherUserEmail must be provided');
  //   }
  // }
  // ngOnInit(): void {
  //   this.otherUserEmail = this.route.snapshot.paramMap.get('email') || '';
  //   let userEmail = '';
  //   const currentUser = this.authService.getCurrentUser();
  //   if (currentUser && currentUser.email) {
  //     userEmail = currentUser.email;
  //   }
  
  //   // If userEmail and otherUserEmail are not empty, store them in local storage
  //   if (userEmail && this.otherUserEmail) {
  //     localStorage.setItem('userEmail', userEmail);
  //     localStorage.setItem('otherUserEmail', this.otherUserEmail);
  //   } else {
  //     // If userEmail and otherUserEmail are empty, try to get them from local storage
  //     userEmail = localStorage.getItem('userEmail') || '';
  //     this.otherUserEmail = localStorage.getItem('otherUserEmail') || '';
  //   }
  
  //   if (userEmail && this.otherUserEmail) {
  //     this.chatService.getMessages(userEmail, this.otherUserEmail).subscribe(messages => {
  //       this.messages = messages;
  //     });
  //   } else {
  //     console.error('Both userEmail and otherUserEmail must be provided');
  //   }
  // }
  ngOnInit(): void {
    this.otherUserEmail = this.route.snapshot.paramMap.get('email') || '';
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.email) {
      this.currentUserEmail = currentUser.email; // Set currentUserEmail here
    }
  
    // If currentUserEmail and otherUserEmail are not empty, store them in local storage
    if (this.currentUserEmail && this.otherUserEmail) {
      localStorage.setItem('userEmail', this.currentUserEmail);
      localStorage.setItem('otherUserEmail', this.otherUserEmail);
    } else {
      // If currentUserEmail and otherUserEmail are empty, try to get them from local storage
      this.currentUserEmail = localStorage.getItem('userEmail') || '';
      this.otherUserEmail = localStorage.getItem('otherUserEmail') || '';
    }
  
    if (this.currentUserEmail && this.otherUserEmail) {
      let chatId = `${this.currentUserEmail.replace(/\./g, ',')}_${this.otherUserEmail.replace(/\./g, ',')}`;
      this.chatService.getMessages(this.currentUserEmail, this.otherUserEmail).subscribe(messages => {
        console.log('Received messages:', messages); // Add this line
        this.messages = messages;
      });
      this.chatService.markAllMessagesAsRead(chatId); // Add this line
    } else {
      console.error('Both currentUserEmail and otherUserEmail must be provided');
    }
  }

  sendMessage(): void {
    const currentUser = this.authService.getCurrentUser();
    const userEmail = currentUser ? currentUser.email : '';
    if (userEmail) {
      this.chatService.sendMessage(this.message, userEmail, this.otherUserEmail);
      this.message = '';
    } else {
      // Handle the case where userEmail is null
      // For example, show an error message to the user
    }
  }
}