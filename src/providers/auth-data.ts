import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../providers/app-data';

declare var firebase: any;
@Injectable()
export class AuthData {

    usersRef: any = firebase.database().ref('users');
    public fireAuth: any;
           
    constructor() { }

    registerUser(user: UserInfo) {
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    }

    signInUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    signOut() {
        return firebase.auth().signOut();
    }

    addUser(username: string,  uid: string) {
        this.usersRef.child(uid).update({
            username: username,
            
        });
    }

    getLoggedInUser() {
        return firebase.auth().currentUser;
    }

    onAuthStateChanged(callback) {
        return firebase.auth().onAuthStateChanged(callback);
    }
    resetPassword(email: string): any {
  return firebase.auth().sendPasswordResetEmail(email);
  
}
logoutUser(): any {
  return this.fireAuth.signOut()

}
}