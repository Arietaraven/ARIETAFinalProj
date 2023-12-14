import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp } from '@angular/fire/app';
// import { initializeApp } from "firebase/app";
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { AuthComponent } from './auth/auth.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotificationComponent } from './notification/notification.component';
import { PostService } from './post_service';
import { BackEndService } from './back-end.service';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';
import { AuthService } from './auth.service';
import { ChatComponent } from './chat/chat.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChatService } from './chat.service';



const routes : Routes = [
  {path: '', redirectTo: 'post-list', pathMatch: 'full'},
  {path: 'post-list', component: PostListComponent},
  {path: 'post-add' , component: PostEditComponent},
  {path: 'authentication', component: AuthComponent},
  {path: 'post-edit/:index', component: PostEditComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'notification', component: NotificationComponent},
  { path: 'chat/:email', component: ChatComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PostEditComponent,
    PostListComponent,
    HeaderComponent,
    PostComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    NotificationComponent,
    ChatComponent,
    UserListComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    // provideFirebaseApp(() => initializeApp(environment)),
    AngularFireModule.initializeApp(environment),
    RouterModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [PostService, BackEndService, AuthService, UserService, NotificationService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
