import {Component} from '@angular/core';
import {NavController, LoadingController, AlertController,NavParams, Platform, ActionSheetController} from 'ionic-angular';

import {UserService} from '../../services/user-service';
import {PostService} from "../../services/post-service";
import { AuthData } from '../../providers/auth-data';
import {ProfileData} from '../../providers/profile-data';
import {WelcomePage} from "../welcome/welcome";

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
 public userProfile: any;
  public birthDate: string;

  constructor(public nav: NavController, public profileData: ProfileData,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, 
    public authData: AuthData) {
    this.nav = nav;
    this.profileData = profileData;
    

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });
    
  }
logOut(){
    this.nav.setRoot(WelcomePage)
}

updateEmail(){
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newEmail',
        placeholder: 'Your new email',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateEmail(data.newEmail);
        }
      }
    ]
  });
  alert.present();
}


updatePassword(){
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newPassword',
        placeholder: 'Your new password',
        type: 'password'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updatePassword(data.newPassword);
        }
      }
    ]
  });
  alert.present();
}

}