import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


import {PostPage} from "../post/post";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  public notifications: any;

  constructor(public nav: NavController) {
    // set sample data
    
  }

  // view post
  viewPost(id) {
    this.nav.push(PostPage, {id: id});
  }
}
