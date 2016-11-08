import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ActivityPage} from "../activity/activity";
import {RegisterPage} from "../register/register";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private nav: NavController) {
  }

  // login and go to home page
  login() {
    this.nav.setRoot(ActivityPage);
  }

  // go sign up page
  signUp() {
    this.nav.setRoot(RegisterPage);
  }
}
