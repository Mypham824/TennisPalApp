import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ActivityPage} from "../activity/activity";
import {LoginPage} from "../login/login";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(private nav: NavController) {
  }

  // go to home page
  goToHome() {
    this.nav.setRoot(ActivityPage);
  }

  // to go login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
