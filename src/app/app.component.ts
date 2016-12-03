import {Component, ViewChild, OnInit } from '@angular/core';
import {Platform, Nav, MenuController, ViewController, Events, ModalController } from 'ionic-angular';
import { Network, Splashscreen, StatusBar } from 'ionic-native';
import { Subscription } from '../../node_modules/rxjs/Subscription';

import firebase from 'firebase';
// import pages
import {WelcomePage} from '../pages/welcome/welcome';
import {LoginPage} from '../pages/login/login';
import {ActivityPage} from '../pages/activity/activity';
import {ChatsPage} from '../pages/chats/chats';
import {NotificationsPage} from '../pages/notifications/notifications';
import {ContactPage} from '../pages/contact/contact';
import {SettingsPage} from '../pages/settings/settings';
// end import pages

import {ReferenceData} from '../../providers/ref-data';


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
      title: 'Chats',
      icon: 'ios-mail-outline',
      count: 0,
      component: ChatsPage
    },

    {
      title: 'Notifications',
      icon: 'ios-notifications-outline',
      count: 0,
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

   
  ];

  constructor(public platform: Platform) {
    this.rootPage = WelcomePage;
 
 
    platform.ready().then(() => {
  
      StatusBar.styleDefault();
    });
    const fbConf = {
    apiKey: "AIzaSyCZ6-zkUrF6DGM4bfqvi3DnKDl5dPLLNJA",
    authDomain: "tennispalapp-f7176.firebaseapp.com",
    databaseURL: "https://tennispalapp-f7176.firebaseio.com",
    storageBucket: "tennispalapp-f7176.appspot.com",
    messagingSenderId: "792577726359"
  };
  firebase.initializeApp(fbConf);
  }


  openPage(page) {

    this.nav.setRoot(page.component);
  } 
}


