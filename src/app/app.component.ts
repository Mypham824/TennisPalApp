import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from 'ionic-native';
import * as firebase from 'firebase';

// import pages
import {WelcomePage} from '../pages/welcome/welcome';
import {LoginPage} from '../pages/login/login';
import {ActivityPage} from '../pages/activity/activity';
import {PostPage} from '../pages/post/post';
import {ChatsPage} from '../pages/chats/chats';
import {NotificationsPage} from '../pages/notifications/notifications';
import {ContactPage} from '../pages/contact/contact';
import {SettingsPage} from '../pages/settings/settings';
// end import pages

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;

  public nav: any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: ActivityPage
    },

    {
      title: 'Post',
      icon: 'ios-list-box-outline',
      count: 0,
      component: PostPage
    },

    {
      title: 'Chats',
      icon: 'ios-mail-outline',
      count: 2,
      component: ChatsPage
    },

    {
      title: 'Notifications',
      icon: 'ios-notifications-outline',
      count: 5,
      component: NotificationsPage
    },

    {
      title: 'Contact',
      icon: 'ios-person-outline',
      count: 0,
      component: ContactPage
    },

    {
      title: 'Settings',
      icon: 'ios-settings-outline',
      count: 0,
      component: SettingsPage
    },

    {
      title: 'Logout',
      icon: 'ios-log-out-outline',
      count: 0,
      component: LoginPage
    },

    // import menu
  ];

  constructor(public platform: Platform) {
    this.rootPage = WelcomePage;
 
 
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    const fbConf = {
		
		apiKey: "AIzaSyCZ6-zkUrF6DGM4bfqvi3DnKDl5dPLLNJA",
		authDomain: "tennispalapp-f7176.firebaseapp.com",
		databaseURL: "https://tennispalapp-f7176.firebaseio.com",
		storageBucket: "tennispalapp-f7176.appspot.com",
		messagingSenderId: "792577726359"

	/*
    apiKey: "AIzaSyAhoXyPHyUfskipPcHAg8XD51vC6I9vU-g",
    authDomain: "tennispalapp-799a4.firebaseapp.com",
    databaseURL: "https://tennispalapp-799a4.firebaseio.com",
    storageBucket: "tennispalapp-799a4.appspot.com",
    messagingSenderId: "318818093736"
	*/
  };
  firebase.initializeApp(fbConf);
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  } 
}


