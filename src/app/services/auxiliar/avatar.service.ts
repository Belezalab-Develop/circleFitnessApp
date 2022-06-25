import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CachingService } from './caching.service';
import { Injectable } from '@angular/core';

import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, docData, Firestore, setDoc, updateDoc , addDoc} from '@angular/fire/firestore';
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

}

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  userUid= null;
  currentUser = null;


  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private afs: AngularFirestore,
    private storage: Storage,
    private serviceStorage: CachingService
  ) {}

  getUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id'}) as Observable<User[]>;
  }


  getUserProfile(uid): Observable<User> {

    const userDocRef = doc(this.firestore, `users/${uid}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<User>;



  }
  getUserChatUsers(uid) {

    const userDocRef = collection(this.firestore, `chats`);
    return collectionData(userDocRef, { idField: 'id' }) ;



  }

  getEspecificChats(uid, ouid){
    const userChatRef = doc(this.firestore, `chats/${uid}/${ouid}`);
    return docData(userChatRef, { idField: 'id'});
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
