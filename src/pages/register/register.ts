import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import { UserInfo } from '../../providers/app-data';
import { ReferenceData } from '../../providers/ref-data';
import { AuthData} from '../../providers/auth-data';  


import {ActivityPage} from "../activity/activity";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  createSignupForm: FormGroup;
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;

   constructor(public nav: NavController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        public fb: FormBuilder,
        public referenceData: ReferenceData,
        public authData: AuthData) { }
  


  ngOnInit() {
        this.createSignupForm = this.fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            'email': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
           
        });

        this.username = this.createSignupForm.controls['username'];
        this.email = this.createSignupForm.controls['email'];
        this.password = this.createSignupForm.controls['password'];
  }

onSubmit(signupForm: any): void {
  var self = this;

   if (this.createSignupForm.valid) {

        let loader = this.loadingCtrl.create({
                content: 'Creating account...',
                dismissOnPageChange: true
            });

   let newUser: UserInfo = {
                email: signupForm.email,
                password: signupForm.password
            };

             loader.present();

            this.authData.registerUser(newUser)
                .then(function (result) {
                    self.authData.addUser(signupForm.username,  self.authData.getLoggedInUser().uid);
                    loader.dismiss()
                        .then(() => {
                            self.viewCtrl.dismiss({
                                user: newUser
                            }).then(() => {
                             let toast = self.toastCtrl.create({
                                    message: 'Account created successfully',
                                    duration: 4000,
                                    position: 'top'
                                });
                                toast.present();
                            });  
                        });
                }).catch(function (error) {
                  
                    var errorMessage = error.message; //handles error during logging in process 
                    console.error(error);
                    loader.dismiss().then(() => {
                        let toast = self.toastCtrl.create({
                            message: errorMessage,
                            duration: 4000,
                            position: 'top'
                        });
                        toast.present();
                    });

                    });

                }
}
}