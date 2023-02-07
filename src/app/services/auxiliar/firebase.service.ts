/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
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
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      console.log('Current User::', this.currentUser);
    });
  }


  async signup({ email, password, nickName, imageUrl, workout_id, nutrition_id }): Promise<any> {
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
      workout_id,
      nutrition_id,
      imageUrl,
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
        this.signup(
          {
            email,
            password,
            nickName: '',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/circlefitnessapp.appspot.com/o/uploads%2Fusers_avatars%2Flogo-fit-ola_200x200.png?alt=media&token=30f559de-122f-4148-9648-dcbcb005ae0f',
            workout_id: 0,
            nutrition_id: 0,
          });

      }).catch(err => {
        console.log('Login firebase error 1::', err);
      });



    }
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  async getUid() {
    const user = this.currentUser;
    if (user === null) {
      return null;
    } else {
      console.log('User for Function::', user);
      return user.uid;
    }
  }
}
