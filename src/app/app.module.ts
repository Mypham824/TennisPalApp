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
import {PostPage} from '../pages/post/post';
import {ChatsPage} from '../pages/chats/chats';
import {UserPage} from '../pages/user/user';
import {ChatDetailPage} from '../pages/chat-detail/chat-detail';
import {NewPostPage} from '../pages/new-post/new-post';
import {NotificationsPage} from '../pages/notifications/notifications';
import {ContactPage} from '../pages/contact/contact';
import {SettingsPage} from '../pages/settings/settings';
// end import pages

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    RegisterPage,
    ActivityPage,
    PostPage,
    ChatsPage,
    UserPage,
    ChatDetailPage,
    NewPostPage,
    NotificationsPage,
    ContactPage,
    SettingsPage,
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
    PostPage,
    ChatsPage,
    UserPage,
    ChatDetailPage,
    NewPostPage,
    NotificationsPage,
    ContactPage,
    SettingsPage,
    /* import pages */
  ],
  providers: [
    UserService,
    PostService,
    ChatService,
    NotificationService,
    /* import services */
  ]
})
export class AppModule {
}
