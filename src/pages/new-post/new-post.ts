import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as firebase from 'firebase';

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
	//var test = firebase.database().ref();
	
	firebase.database().ref('matt_test/').set({
		message : "test"
	});
	
    // back to activity page
    this.nav.pop();
  }
}
