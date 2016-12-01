import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

// import services
import {UserService} from '../services/user-service';
import {PostService} from '../services/post-service';
import {ChatService} from '../services/chat-service';
import {NotificationService} from '../services/notification-service';
// end import services

// import pages
import {WelcomePage} from '../pages/welcome/welcome';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {ActivityPage} from '../pages/activity/activity';
import {PostPosts} from '../pages/post/post';
import {ChatsPage} from '../pages/chats/chats';
import {UserPage} from '../pages/user/user';
import {ChatDetailPage} from '../pages/chat-detail/chat-detail';
import {NewPostPage} from '../pages/new-post/new-post';
import {NotificationsPage} from '../pages/notifications/notifications';
import {ContactPage} from '../pages/contact/contact';
import {SettingsPage} from '../pages/settings/settings';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
// end import pages

// Import providers
import { AuthData } from '../providers/auth-data';
import { PostData } from '../providers/post-data';
import { ProfileData } from '../providers/profile-data';
import { ReferenceData} from '../providers/ref-data';
import {DataRoute} from '../providers/data-route';
import {DataSort} from '../providers/data-sort';


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    RegisterPage,
    ActivityPage,
    ChatsPage,
    UserPage,
    ChatDetailPage,
    NewPostPage,
    NotificationsPage,
    ContactPage,
    SettingsPage,
    ResetPasswordPage,
    PostPosts

    /* import pages */
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    RegisterPage,
    ActivityPage,
    ChatsPage,
    UserPage,
    ChatDetailPage,
    NewPostPage,
    NotificationsPage,
    ContactPage,
    SettingsPage,
    ResetPasswordPage,
    PostPosts
    /* import pages */
  ],
  providers: [
    UserService,
    PostService,
    ChatService,
    NotificationService,
    AuthData,
    PostData,
    ProfileData,
    ReferenceData,
    DataRoute,
    DataSort
    /* import services */
  ]
})
export class AppModule {
}
