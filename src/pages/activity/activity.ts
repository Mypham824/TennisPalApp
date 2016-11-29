import {Component} from '@angular/core';
import {NavController, ActionSheetController, Platform} from 'ionic-angular';
import {PostPage} from "../post/post";
import {UserPage} from "../user/user";
import {NewPostPage} from "../new-post/new-post";
import {PostData} from "../../providers/post-data";
import {ProfileData} from "../../providers/profile-data";
import {AuthData} from "../../providers/auth-data";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  public posts;

  constructor(public nav: NavController,  public postData: PostData,) {
 

   this.nav =nav;
   this.postData = postData;


   this.postData.getPost().on('value', snapshot =>{

      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          type: snap.val().type,
          mode: snap.val().mode,
          best: snap.val().best,
          location: snap.val().location,
          date: snap.val().date,
          description: snap.val().description,
        });
      });
      this.posts = rawList;
    });
  }


  //goes to UserPage
  goToProfile(){
    this.nav.push(UserPage);
  }

  // create a new post
  createPost() {
    this.nav.push(NewPostPage);
  }
}
