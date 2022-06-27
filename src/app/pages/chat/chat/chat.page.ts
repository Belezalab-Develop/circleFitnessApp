
import { PreviewPagePage } from './../../auxiliar/preview-page/preview-page.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AvatarService } from './../../../services/auxiliar/avatar.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { IonContent, PopoverController, LoadingController, AlertController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { format, formatDistance, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('fileToSend', { static: true }) fileToSend: ElementRef;


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
    private avatarService: AvatarService,
    private popoverCtrl: PopoverController,
    private storage: Storage,
    private loadingController: LoadingController,
    private alertController: AlertController

  ) {
    this.name = sessionStorage.getItem('name');
    this.oUid = sessionStorage.getItem('oUid');
    this.uid = sessionStorage.getItem('uid');

    console.log('tiempo', serverTimestamp());


  }

  ngOnInit() {

    this.messages = this.afs.collection('chats')
      .doc(this.uid)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .collection(this.oUid, ref => ref.orderBy('time'))
      .valueChanges();

    this.messages.subscribe(res => {
      console.log(res);
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
    this.afs.collection('chats').doc(this.uid).collection(this.oUid).add({
      time: serverTimestamp(),
      uid: this.uid,
      msg: this.newMsg
    });

    this.afs.collection('chats').doc(this.oUid).collection(this.uid).add({
      time: serverTimestamp(),
      uid: this.uid,
      msg: this.newMsg
    }).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });

  }

  formatDate(time) {
    const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);

    const fw = formatDistanceToNow(date, { addSuffix: true, locale: es });
    return fw;
  }

  triggerFile() {
    this.fileToSend.nativeElement.click();
  }


  async uploadImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const fileName = new Date().getTime() + '.jpeg';
      const path = `uploads/chats/${this.uid}/${fileName}`;
      const storageRef = ref(this.storage, path);

      await uploadString(storageRef, image.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      this.afs.collection('chats').doc(this.uid).collection(this.oUid).add({
        time: serverTimestamp(),
        uid: this.uid,
        msg: this.newMsg,
        imageUrl
      });

      this.afs.collection('chats').doc(this.oUid).collection(this.uid).add({
        time: serverTimestamp(),
        uid: this.uid,
        msg: this.newMsg,
        imageUrl
      }).then(() => {
        this.newMsg = '';
        this.content.scrollToBottom();
      });


      loading.dismiss();


    }
  }








}
