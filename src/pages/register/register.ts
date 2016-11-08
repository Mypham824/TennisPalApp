import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ActivityPage} from "../activity/activity";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private nav: NavController) {
  }

  // sign up and go to home page
  signUp() {
    this.nav.setRoot(ActivityPage);
  }
}
