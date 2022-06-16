
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CachingService } from './caching.service';
import { Injectable } from '@angular/core';

import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

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

  getUserProfile(uid) {

    const userDocRef = doc(this.firestore, `users/${uid}`);
    return docData(userDocRef, { idField: 'id' });



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
