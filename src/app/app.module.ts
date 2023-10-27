import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

const routes : Routes = [
  {path: '', redirectTo: 'post-list', pathMatch: 'full'},
  {path: 'post-list', component: PostListComponent},
  {path: 'post-add' , component: PostEditComponent},
  {path: 'authentication', component: AuthComponent},
  {path: 'post-edit/:index', component: PostEditComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PostEditComponent,
    PostListComponent,
    HeaderComponent,
    PostComponent,
    AuthComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
