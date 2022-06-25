import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AvatarService } from './../../../services/auxiliar/avatar.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { doc, docData, Firestore, setDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { IonContent } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;


  messages: Observable<any[]>;
  newMsg = '';

  allUser: [];
  name;
  oUid;
  uid;

  chats = [];

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private avatarService: AvatarService

  ) {
    this.name = sessionStorage.getItem('name');
    this.oUid = sessionStorage.getItem('oUid');
    this.uid = sessionStorage.getItem('uid');




  }

  ngOnInit() {


    this.messages = this.afs.collection('chats')
      .doc(this.uid)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .collection('user'+this.oUid, ref => ref.orderBy('time'))
      .valueChanges();

    this.messages.subscribe(res => {

      this.chats = [];
      res.forEach(child => {

        this.chats.push(child);
      });
    });

    /* firebase.firestore().collection('chats').doc(this.uid).collection(this.oUid).orderBy('time').onSnapshot(snap => {

      this.chats = [];
      snap.forEach(child => {
        this.chats.push(child.data());
      });
    }); */
  }

  async sendMessage() {


    this.afs.collection('chats').doc(this.uid).collection('user'+this.oUid).add({
      time: Date.now(),
      uid: this.uid,
      msg: this.newMsg
    });

    this.afs.collection('chats').doc(this.oUid).collection('user'+this.uid).add({
      time: Date.now(),
      uid: this.uid,
      msg: this.newMsg
    }).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });

  }

}
