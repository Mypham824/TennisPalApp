import {Component} from '@angular/core';
import {NavController, NavParams, Platform, ActionSheetController} from 'ionic-angular';

import {UserService} from '../../services/user-service';
import {PostService} from "../../services/post-service";
import {PostPage} from "../post/post";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public user: any;

  constructor(public nav: NavController, public navParams: NavParams, public userService: UserService,
              public postService: PostService, public platform: Platform, public actionSheetCtrl: ActionSheetController) {
    // get sample data only
    //this.user = userService.getItem(navParams.get('id'));
    this.user = userService.getItem(0);

    Object.assign(this.user, {
      'followers': 199,
      'following': 48,
      'favorites': 14,
      'posts': postService.getAll()
    });
  }

  toggleLike(post) {
    // if user liked
    if(post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }

    post.liked = !post.liked
  }

  // on click, go to user timeline
  viewUser(userId) {
    this.nav.push(UserPage, {id: userId})
  }

  // on click, go to post detail
  viewPost(postId) {
    this.nav.push(PostPage, {id: postId})
  }

  showActions() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
