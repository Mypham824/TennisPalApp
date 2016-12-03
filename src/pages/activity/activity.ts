import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, ToastController, Content, Events } from 'ionic-angular';

import {AppPosts} from '../../providers/app-data';
import {AuthData} from "../../providers/auth-data";
import {ReferenceData} from '../../providers/ref-data';
import {DataRoute} from '../../providers/data-route';
import {DataSort} from '../../providers/data-sort';


import {NewPostPage} from "../new-post/new-post";
import{UserPage} from '../user/user';
import {CommentCreatePage} from '../new-comment/new-comment';
import {PostCommentsPage} from '../post-comments/post-comments';

@Component({
  templateUrl: 'activity.html',
})
export class ActivityPage {

  @ViewChild(Content) content: Content;
  segment: string = 'all';
  selectedSegment: string = this.segment;
  queryText: string = '';
  public start: number;
  public pageSize: number = 3;
  public loading: boolean = true;
  public internetConnected: boolean = true;
  public firebaseConnectionAttempts: number = 0;

  public posts: Array<AppPosts> = [];
  public newPosts: Array<AppPosts> = [];
  public favoritePostKeys: string[];
 

  constructor(public nav: NavController,  
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public authData: AuthData,
              public refData: ReferenceData,
              public dataRoute: DataRoute,
              public dataSort: DataSort,
             public events: Events) { }

//initializes components after the first display of data
  ngOnInit() {
    var self = this;
    self.segment = 'all';
    self.events.subscribe('network:connected', self.networkConnected);
    self.events.subscribe('posts:add', self.addNewPosts);

    self.checkFirebase();
  }

    checkFirebase() {
    let self = this;
    if (!self.refData.isFirebaseConnected()) {
      setTimeout(function () {
        console.log('Retry : ' + self.firebaseConnectionAttempts);
        self.firebaseConnectionAttempts++;
        if (self.firebaseConnectionAttempts < 5) {
          self.checkFirebase();
        } else {
          self.internetConnected = false;
    
        }
      }, 1000);
    } else {
      console.log('Firebase connection found (activity.ts) - attempt: ' + self.firebaseConnectionAttempts);
      self.refData.getStatisticsRef().on('child_changed', self.onPostAdded);
      if (self.authData.getLoggedInUser() === null) {
        //
      } else {
        self.loadPosts(true);
      }
    }
  }
  public networkConnected = (connection) => {
    var self = this;
    self.internetConnected = connection[0];
    console.log('NetworkConnected event: ' + self.internetConnected);

    if (self.internetConnected) {
      self.posts = [];
      self.loadPosts(true);
    } else {
      self.notify('No connection');
    }
  }


    public onPostAdded = (childSnapshot, prevChildKey) => {
    let priority = childSnapshot.val(); 
    var self = this;
    self.events.publish('post:created');
    // fetch new thread..
    self.refData.getPostsRef().orderByPriority().equalTo(priority).once('value').then(function (dataSnapshot) {
      let key = Object.keys(dataSnapshot.val())[0];
      let newPost: AppPosts = self.dataRoute.getPost(dataSnapshot.val()[key], key);
      self.newPosts.push(newPost);
    });
  }

     public addNewPosts = () => {
    var self = this;
    self.newPosts.forEach(function (post: AppPosts) {
      self.posts.unshift(post);
    });

    self.newPosts = [];
    self.scrollToTop();
    self.events.publish('posts:viewed');
  }

   loadPosts(fromStart: boolean) {
    var self = this;

    if (fromStart) {
      self.loading = true;
      self.posts = [];
      self.newPosts = [];

      if (self.segment === 'all') {
        this.refData.getTotalPosts().then(function (snapshot) {
          self.start = snapshot.val();
          self.getPosts();
        });
      } else {
        self.start = 0;
        self.favoritePostKeys = [];
        self.refData.getFavoritePosts(self.authData.getLoggedInUser().uid).then(function (dataSnapshot) {
          let favoritePosts = dataSnapshot.val();
          self.dataSort.getKeys(favoritePosts).forEach(function (postKey) {
            self.start++;
            self.favoritePostKeys.push(postKey);
          });
          self.getPosts();
        });
      }
    } else {
      self.getPosts();
    }
  }

getPosts() {
    var self = this;
    let startFrom: number = self.start - self.pageSize;
    if (startFrom < 0)
      startFrom = 0;
    if (self.segment === 'all') {
      this.refData.getPostsRef().orderByPriority().startAt(startFrom).endAt(self.start).once('value', function (snapshot) {
        self.dataSort.reversedItems<AppPosts>(self.dataRoute.getPosts(snapshot)).forEach(function (post) {
          self.posts.push(post);
        });
        self.start -= (self.pageSize + 1);
        self.events.publish('posts:viewed');
        self.loading = false;
      });
    } else {
      self.favoritePostKeys.forEach(key => {
        this.refData.getPostsRef().child(key).once('value')
          .then(function (dataSnapshot) {
            self.posts.unshift(self.dataRoute.getPost(dataSnapshot.val(), key));
          });
      });
      self.events.publish('posts:viewed');
      self.loading = false;
    }

  }

createPost() {
    var self = this;
    let modalPage = this.modalCtrl.create(NewPostPage);

    modalPage.onDidDismiss((data: any) => {
      if (data) {
        let toast = this.toastCtrl.create({
          message: 'Post has been created',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();

        if (data.priority === 1)
          self.newPosts.push(data.post);

        self.addNewPosts();
      }
    });

    modalPage.present();
  }

  viewComments(key: string) {
    if (this.internetConnected) {
      this.nav.push(PostCommentsPage, {
        postKey: key
      });
    } else {
      this.notify('Network not found..');
    }
  }
 reloadPosts(refresher) {
    this.queryText = '';
    if (this.internetConnected) {
      this.loadPosts(true);
      refresher.complete();
    } else {
      refresher.complete();
    }
  }

  fetchNextPosts(infiniteScroll) {
    if (this.start > 0 && this.internetConnected) {
      this.loadPosts(false);
      infiniteScroll.complete();
    } else {
      infiniteScroll.complete();
    }
  }
    scrollToTop() {
    var self = this;
    setTimeout(function () {
      self.content.scrollToTop();
    }, 1500);
  }

  notify(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   goToProfile(){
    this.nav.push(UserPage);
  }

}
