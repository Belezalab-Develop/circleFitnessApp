import { CachingService } from './caching.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';


export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentUser: User = null;

  allUser: any;

  constructor(
    //private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storageService: CachingService,
    private auth: Auth
  ) {
    /* this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    }); */
  }


  async signup({ email, password, nickName }): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const uid = credential.user.uid;

    this.storageService.setStorage('user_uid', uid);

    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      name: nickName,
      email: credential.user.email,
    });
  }

  async signIn({ email, password }) {

    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {

      await this.storageService.getStorage('user').then((user) => {
        this.signup({ email, password, nickName: '' });

      }).catch(err => {
        console.log('Login firebase error 1::', err);
      });



    }
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user === null) {
      return null;
    } else {
      return user.uid;
    }
  }
}
