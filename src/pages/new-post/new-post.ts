import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import { AppPosts } from '../../providers/app-data';
import {AuthData } from '../../providers/auth-data';
import {ReferenceData} from  '../../providers/ref-data';  



@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage implements OnInit {

  createPostForm: FormGroup;
  title: AbstractControl;
  matchtype: AbstractControl;
  matchmode: AbstractControl;
  bestof:AbstractControl;
  location:AbstractControl;
  dateofmatch:AbstractControl;
  description:AbstractControl;

  constructor(public nav: NavController, 
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              public fb: FormBuilder,
              public authData: AuthData,
              public refData: ReferenceData ) { }
  

   ngOnInit() {
    console.log('in post create..');
    this.createPostForm = this.fb.group({
      'title': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'matchtype': [''],
      'matchmode': [''],
      'bestof': [''],
      'location': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'dateofmatch':[''],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });

    this.title = this.createPostForm.controls['title'];
    this.matchtype = this.createPostForm.controls['matchtype'];
    this.matchmode = this.createPostForm.controls['matchmode'];
    this.bestof = this.createPostForm.controls['bestof'];
    this.location = this.createPostForm.controls['location'];
    this.dateofmatch = this.createPostForm.controls['dateofmatch'];
    this.description = this.createPostForm.controls['description'];
  }

  cancelNewPost() {
    this.viewCtrl.dismiss();
  }

		
   onSubmit(post: any): void {
    var self = this;
    if (this.createPostForm.valid) {

      let loader = this.loadingCtrl.create({
        content: 'creating post ',
        dismissOnPageChange: true
      });

      loader.present();

      let uid = self.authData.getLoggedInUser().uid;
      self.refData.getUsername(uid).then(function (snapshot) {
        let username = snapshot.val();

        self.refData.getTotalPosts().then(function (snapshot) {
          let currentNumber = snapshot.val();
          let newPriority: number = currentNumber === null ? 1 : (currentNumber + 1);

          let newPost: AppPosts = {
            key: null,
            title: post.title,
            matchtype: post.matchtype,
            matchmode: post.matchmode,
            bestof: post.bestof,
            location: post.location,
            dateofmatch: post.dateofmatch,
            description: post.description,
            user: { uid: uid, username: username },
            datecreated: new Date().toString(),
            comments: null
          };

          self.refData.submitPost(newPost, newPriority)
            .then(function (snapshot) {
              loader.dismiss()
                .then(() => {
                  self.viewCtrl.dismiss({
                    post: newPost,
                    priority: newPriority
                  });
                });
            }, function (error) {
              // The Promise was rejected.
              console.error(error);
              loader.dismiss();
            });
        });
      });
    }
  }

}
