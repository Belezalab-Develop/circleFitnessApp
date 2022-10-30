/* eslint-disable max-len */
import { map } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CachingService } from './caching.service';
import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

import { Auth } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  doc, docData,
  Firestore,
  setDoc,
  updateDoc,
  addDoc,
  getDocs,
  getDocsFromServer
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';


export interface User {
  uid: string;
  id?: string;
  name?: string;
  email: string;
  imageUrl?: string;
  lat?: string;
  long?: string;
  distance?: number;

}

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  userUid = null;
  currentUser = null;
  fgh = null;


  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private afs: AngularFirestore,
    private storage: Storage,
    private serviceStorage: CachingService,
    private firebaseService: FirebaseService
  ) { }
    //TODO::incluir el calculo de la distancia aqui
  getUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }




  getUserProfile(uid): Observable<User> {

    const userDocRef = doc(this.firestore, `users/${uid}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<User>;



  }


  getUserChatUsers(uid) {

    const userDocRef = collection(this.firestore, `chats`);
    return collectionData(userDocRef, { idField: 'id' });



  }

  getEspecificChats(uid) {
    const userChatRef = collection(this.firestore, `lastChats/${uid}/participantes/`);

    return collectionData(userChatRef).pipe(
      map(
        response => response
          .sort((a, b) =>
            new Date(b.time.seconds * 1000 + b.time.nanoseconds / 1000000).getTime() -
            new Date(a.time.seconds * 1000 + a.time.nanoseconds / 1000000).getTime())));
  }

  async updateName(uid, name) {

    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        name
      });
      return true;
    } catch (e) {
      return null;
    }
  }

  async updateRecivedMessage(uid, badge) {

    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        badge
      });
      return true;
    } catch (e) {
      return null;
    }
  }

  async updatePrincipalBadge(uid, principalBadge) {

    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        principalBadge
      });
      return true;
    } catch (e) {
      return null;
    }
  }


  async updateToken(uid, pushToken) {

    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        pushToken
      });
      return true;
    } catch (e) {
      return null;
    }
  }

  async setParticipants(uid, ouid, time, img, toUid, toName) {

    try {
      const userDocRef = doc(this.firestore, `lastChats/${uid}/participantes/${ouid}/`);
      await setDoc(userDocRef, {
        time,
        img,
        toUid,
        toName
      });
      return true;
    } catch (e) {
      return e;
    }
  }

  async updatePosition(uid, lat, long) {

    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        lat,
        long
      });
      return true;
    } catch (e) {
      return null;
    }
  }

  async update(uid, data) {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        data
      });
      return true;

    } catch (error) {

    }
  }

  async uploadImage(cameraFile: Photo, uid) {
    const path = `uploads/${uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        imageUrl,
      });
      return true;
    } catch (e) {
      return null;
    }
  }








}
