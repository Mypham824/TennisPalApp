import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController, ActionSheetController} from 'ionic-angular';


import { AuthData } from '../../providers/auth-data';
import {ReferenceData} from '../../providers/ref-data';
import {AppUser} from '../../providers/app-data';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit {
  userDataLoaded: boolean = false;
  user: AppUser;
  username: string;
  userProfile = {};
  tennisPalAccount: any = {};
  userStatistics: any = {};
 

  constructor(public navCtrl: NavController, 
              public refData: ReferenceData,
              public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController, 
              public authData: AuthData) {}
  
   ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    var self = this;
    self.userDataLoaded = false;
    
    self.getUserData().then(function (snapshot) {
      let userData: any = snapshot.val();

      self.getUserImage().then(function (url) {
        self.userProfile = {
          username: userData.username,

          totalFavorites: userData.hasOwnProperty('favorites') === true ?
            Object.keys(userData.favorites).length : 0
        };

        self.user = {
          uid : self.tennisPalAccount.uid,
          username : userData.username
        };

        self.userDataLoaded = true;
      }).catch(function (error) {
        console.log(error.code);
        self.userProfile = {
          username: userData.username,
          totalFavorites: userData.hasOwnProperty('favorites') === true ?
            Object.keys(userData.favorites).length : 0
        };
        self.userDataLoaded = true;
      });
    });

    self.getUserPosts();
    self.getUserComments();
  }

  getUserData() {
    var self = this;

    self.tennisPalAccount = self.authData.getLoggedInUser();
    return self.refData.getUser(self.authData.getLoggedInUser().uid);
  }

  getUserImage() {
    var self = this;

    return self.refData.getStorageRef().child('' + self.tennisPalAccount.uid + '').getDownloadURL();
  }

  getUserPosts() {
    var self = this;

    self.refData.getUserPosts(self.authData.getLoggedInUser().uid)
      .then(function (snapshot) {
        let userPosts: any = snapshot.val();
        if (userPosts !== null) {
          self.userStatistics.totalPosts = Object.keys(userPosts).length;
        } else {
          self.userStatistics.totalPost = 0;
        }
      });
  }

  getUserComments() {
    var self = this;

    self.refData.getUserComments(self.authData.getLoggedInUser().uid)
      .then(function (snapshot) {
        let userComments: any = snapshot.val();
        if (userComments !== null) {
          self.userStatistics.totalComments = Object.keys(userComments).length;
        } else {
          self.userStatistics.totalComments = 0;
        }
      });
  }



} 
