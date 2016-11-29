import { Injectable } from '@angular/core';

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


  getPost(): any {
    return this.userPost
  }

    getPostDetail(postId): any {
    return this.userPost.child(postId);
  }

  createNewPost(
  matchtype: string, 
  matchmode: string, 
  bestof: number, 
  location: string, 
  dateofmatch: number,
  description: string
  ): any{
    return this.userPost.push({
      type: matchtype,
      mode: matchmode,
      best: bestof, 
      location: location,
      date: dateofmatch,
      description: description,

    }).then( newPost => {
      this.userPost.child(newPost.key).child('id').set(newPost.key);
    })






}






  }


