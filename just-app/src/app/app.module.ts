import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageExpandComponent } from './pop-ups/image-expand/image-expand.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowFollowersComponent } from './show-followers/show-followers.component';
import { ShowProfilePostsComponent } from './show-profile-posts/show-profile-posts.component';
import { ProfileImageExpandComponent } from './pop-ups/profile-image-expand/profile-image-expand.component';
import { AddPostComponent } from './pop-ups/add-post/add-post.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MessagePopUpComponent } from './pop-ups/message-pop-up/message-pop-up.component';
import { IconMessagePopUpComponent } from './pop-ups/icon-message-pop-up/icon-message-pop-up.component';
import { ForgotPasswordComponent } from './pop-ups/forgot-password/forgot-password.component';
import {MatInputModule} from '@angular/material/input';
import { AuthInterceptor } from './authentication/auth-interceptor';
import { UpdateUserComponent } from './pop-ups/update-user/update-user.component';
import { DatePipe } from '@angular/common';
import { EditPostComponent } from './pop-ups/edit-post/edit-post.component';
import { DeleteComponent } from './pop-ups/delete/delete.component';
import { LikesPopupComponent } from './pop-ups/likes-popup/likes-popup.component';
import { AddCommentPopupComponent } from './pop-ups/add-comment-popup/add-comment-popup.component';
import { CommentsPopupComponent } from './pop-ups/comments-popup/comments-popup.component';
import { ShowCommentsComponent } from './show-comments/show-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    LeftNavComponent,
    ContentAreaComponent,
    RightNavComponent,
    SignUpComponent,
    ImageExpandComponent,
    UserProfileComponent,
    HeaderBarComponent,
    PageNotFoundComponent,
    ShowFollowersComponent,
    ShowProfilePostsComponent,
    ProfileImageExpandComponent,
    AddPostComponent,
    MessagePopUpComponent,
    IconMessagePopUpComponent,
    ForgotPasswordComponent,
    UpdateUserComponent,
    EditPostComponent,
    DeleteComponent,
    LikesPopupComponent,
    AddCommentPopupComponent,
    CommentsPopupComponent,
    ShowCommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FontAwesomeModule,
    MatDialogModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgHttpLoaderModule.forRoot(),
    MatInputModule,
  ],
  providers: [DatePipe,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
