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
    // add your code here
	firebase.database().ref('posted-matches/').set({
		"match-id" : 12352351234,
		"match-type" : "Singles",
		"match-mode" : "Competative",
		"best-of" : 3,
		"give-contact" : true,
		"date" : "2016-11-01",
		"location" : "USF",
		"match-taken" : false
	});

    // back to activity page
    this.nav.pop();
  }
}
