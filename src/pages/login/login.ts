import { Component, OnInit } from '@angular/core';
import {  NavController, LoadingController, ToastController,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms'
import {ActivityPage} from "../activity/activity";
import {RegisterPage} from "../register/register";
import {ResetPasswordPage} from "../reset-password/reset-password";
import {WelcomePage} from "../welcome/welcome";

import {AuthData} from '../../providers/auth-data';
import {UserInfo}from '../../providers/app-data';
import {ReferenceData} from '../../providers/ref-data';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

        loginAppForm: FormGroup;
        email: AbstractControl;
        password: AbstractControl;


    constructor(public nav: NavController, 
                public authData: AuthData, 
                public refData: ReferenceData,
                public toastCtrl: ToastController,
                public fb: FormBuilder,
                public alertCtrl: AlertController, 
                public loadingCtrl: LoadingController) { }


  ngOnInit() {
        this.loginAppForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });

        this.email = this.loginAppForm.controls['email'];
        this.password = this.loginAppForm.controls['password'];
    }

    onSubmit(signInForm: any): void {
        var self = this;
        if (this.loginAppForm.valid) {

            let loader = this.loadingCtrl.create({
                content: 'Signing in for tennis fun!',
                dismissOnPageChange: true
            });

            loader.present();

            let user: UserInfo = {
                email: signInForm.email,
                password: signInForm.password
            };

 console.log(user);
            this.authData.signInUser(user.email, user.password)
                .then(function (result) {
                    self.nav.setRoot(ActivityPage);
                }).catch(function (error) {
               //If invalid credentials are entered, a toast will pop up and you will be able 
               //to try again
                    loader.dismiss().then(() => {
                             let toast = self.toastCtrl.create({
                                    message: 'You have entered in invalid credentials.',
                                    duration: 4000,
                                    position: 'top'
                                });
                                toast.present();
                            });  

                });
                      
                   
             
        }
    }

  goToSignUp(){
    this.nav.push(RegisterPage);
  }

  
  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

}

