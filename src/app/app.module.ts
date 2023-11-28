import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
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



const routes : Routes = [
  {path: '', redirectTo: 'post-list', pathMatch: 'full'},
  {path: 'post-list', component: PostListComponent},
  {path: 'post-add' , component: PostEditComponent},
  {path: 'authentication', component: AuthComponent},
  {path: 'post-edit/:index', component: PostEditComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
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
    SignUpComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment)),
    AngularFireModule.initializeApp(environment),
    // AngularFireModule.initializeApp(environment.firebase),
    RouterModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
