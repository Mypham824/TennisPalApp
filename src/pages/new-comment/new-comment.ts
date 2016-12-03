import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import { PostComments,AppUser } from '../../providers/app-data';
import { AuthData } from '../../providers/auth-data';
import { ReferenceData } from '../../providers/ref-data';

@Component({
  templateUrl: 'new-comment.html'
})
export class CommentCreatePage implements OnInit {

  createCommentForm: FormGroup;
  comment: AbstractControl;
  postKey: string;
  loaded: boolean = false;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    public authData: AuthData,
    public refData: ReferenceData) {

  }

  ngOnInit() {
    this.postKey = this.navParams.get('postKey');

    this.createCommentForm = this.fb.group({
      'comment': ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });

    this.comment = this.createCommentForm.controls['comment'];
    this.loaded = true;
  }

  cancelNewComment() {
    this.viewCtrl.dismiss();
  }

  onSubmit(commentForm: any): void {
    var self = this;
    if (this.createCommentForm.valid) {

      let loader = this.loadingCtrl.create({
        content: 'Posting comment...',
        dismissOnPageChange: true
      });

      loader.present();

      let uid = self.authData.getLoggedInUser().uid;
      self.refData.getUsername(uid).then(function (snapshot) {
        let username = snapshot.val();

        let commentRef = self.refData.getCommentsRef().push();
        let commentkey: string = commentRef.key;
        let user: AppUser = { uid: uid, username: username };

        let newComment: PostComments = {
          key: commentkey,
          text: commentForm.comment,
          post: self.postKey,
          user: user,
          datecreated: new Date().toString(),
          votesUp: null,
          votesDown: null
        };

        self.refData.submitComment(self.postKey, newComment)
          .then(function (snapshot) {
            loader.dismiss()
              .then(() => {
                self.viewCtrl.dismiss({
                  comment: newComment,
                  user: user
                });
              });
          }, function (error) {
            // The Promise was rejected.
            console.error(error);
            loader.dismiss();
          });
      });
    }
  }
}
