import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, ModalController, ToastController, LoadingController, NavParams, Content } from 'ionic-angular';

import { CommentCreatePage } from '../new-comment/new-comment';
import { PostComments } from '../../providers/app-data';
import { AuthData } from '../../providers/auth-data';
import { ReferenceData } from '../../providers/ref-data';
import { DataSort } from '../../providers/data-sort';
import { DataRoute} from '../../providers/data-route';

@Component({
    templateUrl: 'post-comments.html'
})
export class PostCommentsPage implements OnInit {
    @ViewChild(Content) content: Content;
    postKey: string;
    commentsLoaded: boolean = false;
    comments: PostComments[];

    constructor(public actionSheeCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        public authData: AuthData,
        public refData: ReferenceData,
        public dataSort: DataSort,
        public dataRoute: DataRoute) { }

    ngOnInit() {
        var self = this;
        self.postKey = self.navParams.get('postKey');
        self.commentsLoaded = false;

        self.refData.getPostCommentsRef(self.postKey).once('value', function (snapshot) {
            self.comments = self.dataRoute.getComments(snapshot);
            self.commentsLoaded = true;
        }, function (error) {});
    }

    createComment() {
        let self = this;

        let modalPage = this.modalCtrl.create(CommentCreatePage, {
            postKey: this.postKey
        });

        modalPage.onDidDismiss((commentData: any) => {
            if (commentData) {
                let commentVals = commentData.comment;
                let commentUser = commentData.user;

                let createdComment: PostComments = {
                    key: commentVals.key,
                    post: commentVals.post,
                    text: commentVals.text,
                    user: commentUser,
                    datecreated: commentVals.dateCreated,
                    votesUp: null,
                    votesDown: null
                };

                self.comments.push(createdComment);
                self.scrollToBottom();

                let toast = this.toastCtrl.create({
                    message: 'Comment created',
                    duration: 2000,
                    position: 'top'
                });
                toast.present();
            }
        });

        modalPage.present();
    }

    scrollToBottom() {
        this.content.scrollToBottom();
    }

    vote(like: boolean, comment: PostComments) {
        var self = this;

        self.refData.voteComment(comment.key, like, self.authData.getLoggedInUser().uid).then(function () {
            self.refData.getCommentsRef().child(comment.key).once('value').then(function (snapshot) {
                comment = self.dataRoute.getComment(snapshot, comment.key);
                self.dataSort.setItem<PostComments>(self.comments, c => c.key === comment.key, comment);
            });
        });
    }

    showCommentActions() {
        var self = this;
        let actionSheet = self.actionSheeCtrl.create({
            title: 'Post Actions',
            buttons: [
                {
                 
                    
                },
                {
                    text: 'Cancel',
                    icon: 'close-circle',
                    role: 'cancel',
                    handler: () => { }
                }
            ]
        });

        actionSheet.present();
    }

    addPostToFavorites() {
        var self = this;
        let currentUser = self.authData.getLoggedInUser();
        if (currentUser != null) {
            self.refData.addPostToFavorites(currentUser.uid, self.postKey)
                .then(function () {
                    let toast = self.toastCtrl.create({
                        message: 'Added to favorites',
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                });
        } else {
            let toast = self.toastCtrl.create({
                message: 'This action is available only for authenticated users',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    }
}