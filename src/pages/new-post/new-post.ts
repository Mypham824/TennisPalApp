import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { PostData } from '../../providers/post-data';


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

  constructor(public nav: NavController, public postData: PostData) {
    this.nav = nav;
    this.postData = postData;
  }

  createNewPost(
   matchtype: string,
   matchmode: string, 
   bestof: number, 
   location: string, 
   dateofmatch: number,
   description: string ) {
    this.postData.createNewPost(matchtype, matchmode, bestof, location, dateofmatch,description ).then( () => {
      this.nav.pop();
    });

		
  }

}