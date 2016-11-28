import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

/*
  Generated class for the PostData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostData {


  public currentUser: any; 
  public userPost: any; 
  

  constructor() {
  
    this.currentUser = firebase.auth().currentUser.uid;
    this.userPost = firebase.database().ref('userProfile/' + this.currentUser + '/userPost');
  
  }


  createPost(matchtype: string, matchmode: string, bestof: number): any{
    return this.userPost.push({
      type: matchtype,
      mode: matchmode,
      best: bestof
    }).then( newPost => {
      this.userPost.child(newPost.key).child('id').set(newPost.key);
    })






}






  }


