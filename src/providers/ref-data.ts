import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { AppPosts, PostComments } from '../providers/app-data';

declare var firebase: any;

@Injectable()
export class ReferenceData {
    databaseRef: any = firebase.database();
    usersRef: any = firebase.database().ref('users');
    postsRef: any = firebase.database().ref('posts');
    commentsRef: any = firebase.database().ref('comments');
    statisticsRef: any = firebase.database().ref('statistics');
    storageRef: any = firebase.storage().ref();
    connectionRef: any = firebase.database().ref('.info/connected');

        connected: boolean = false;
     constructor() {
        var self = this;
        try {
            self.checkFirebaseConnection();
         
            self.InitData();
        } catch (error) {
            console.log('Data Service error:' + error);
        }
    }

    checkFirebaseConnection() {
        try {
            var self = this;
            var connectedRef = self.getConnectionRef();
            connectedRef.on('value', function (snap) {
                console.log(snap.val());
                if (snap.val() === true) {
                    console.log('Firebase: Connected:');
                    self.connected = true;
                } else {
                    console.log('Firebase: No connection:');
                    self.connected = false;
                }
            });
        } catch (error) {
            self.connected = false;
        }
    }

    isFirebaseConnected() {
              return this.connected;
    }

    private InitData() {
        let self = this;
        // Set statistics/threads = 1 for the first time only
        self.getStatisticsRef().child('posts').transaction(function (currentRank) {
            if (currentRank === null) {
                return 1;
            }
        }, function (error, committed, snapshot) {
            if (error) {
                console.log('', error);
            } else if (!committed) {
                console.log('.');
            } else {
                console.log('Threads number initialized!');

            let post: AppPosts = {
                    key: null,
                    title: 'Thank you for joining TennisPal',
                    matchtype: null,
                    matchmode: null, 
                    bestof: null,
                    location: 'Home',
                    dateofmatch: null,
                    description: 'Best App Ever!',
                    datecreated: new Date().toString(),
                    user: { uid: 'default', username: 'Administrator' },
                    comments: 0
                };
                      let firstPostRef = self.postsRef.push();
                firstPostRef.setWithPriority(post, 1).then(function (dataShapshot) {
                    console.log('Congratulations! You have created the first thread!');
                });
    
            }
            console.log('commited', snapshot.val());
        }, false);
    }

     getStatisticsRef() {
        return this.statisticsRef;
    }


 getConnectionRef() {
        return this.connectionRef;
    }

    getDatabaseRef() {
        return this.databaseRef;
    }

      getPostsRef() {
        return this.postsRef;
    }
    
     getCommentsRef() {
        return this.commentsRef;
    }
      getUsersRef() {
        return this.usersRef;
    }
    getStorageRef() {
        return this.storageRef;
    }
    getPostCommentsRef(postKey: string) {
        return this.commentsRef.orderByChild('post').equalTo(postKey);
    }
      loadPosts() {
        return this.postsRef.once('value');
    }

    submitPost(post: AppPosts, priority: number) {

        var newPostRef = this.postsRef.push();
         this.statisticsRef.child('posts').set(priority);
        console.log(priority);
        return newPostRef.setWithPriority(post, priority);
    }
      loadComments(postKey: string) {
        return this.commentsRef.orderByChild('post').equalTo(postKey).once('value');
    }
        submitComment(postKey: string, comment: PostComments) {
        // let commentRef = this.commentsRef.push();
        // let commentkey: string = commentRef.key;
        this.commentsRef.child(comment.key).set(comment);

        return this.postsRef.child(postKey + '/comments').once('value')
            .then((snapshot) => {
                let numberOfComments = snapshot == null ? 0 : snapshot.val();
                this.postsRef.child(postKey + '/comments').set(numberOfComments + 1);
            });
    }
      getUsername(userUid: string) {
        return this.usersRef.child(userUid + '/username').once('value');
    }

    getUser(userUid: string) {
        return this.usersRef.child(userUid).once('value');
    }

    getUserPosts(userUid: string) {
        return this.postsRef.orderByChild('user/uid').equalTo(userUid).once('value');
    }

    getUserComments(userUid: string) {
        return this.commentsRef.orderByChild('user/uid').equalTo(userUid).once('value');
    }
    getTotalPosts() {
        return this.statisticsRef.child('posts').once('value');
    }
     getFavoritePosts(user: string) {
        return this.usersRef.child(user + '/favorites/').once('value');
    }
     addPostToFavorites(userKey: string, threadKey: string) {
        return this.usersRef.child(userKey + '/favorites/' + threadKey).set(true);
    }
        voteComment(commentKey: string, like: boolean, user: string): any {
        let commentRef = this.commentsRef.child(commentKey + '/votes/' + user);
        return commentRef.set(like);
}


}