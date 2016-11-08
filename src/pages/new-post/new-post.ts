import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/componenqts/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {

  constructor(public nav: NavController) {}

  // post status
  post() {
    // add your code here
    // back to activity page
    this.nav.pop();
  }
}
