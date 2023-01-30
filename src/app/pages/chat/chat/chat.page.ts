import { shareReplay } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/no-shadow */

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
import { IonContent, PopoverController, LoadingController, AlertController, IonList } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { format, formatDistance, formatDistanceToNow } from 'date-fns';
import { es, pt, ptBR } from 'date-fns/locale';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/services/analytics.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('fileToSend', { static: true }) fileToSend: ElementRef;
  @ViewChild(IonList, {read: ElementRef}) chatList: ElementRef;


  messages: Observable<any[]>;
  newMsg = '';

  allUser: [];
  name;
  oUid;
  uid;
  imagenUrl;
  fromName;
  toEmail;
  toWorkoutId;
  toNutritionId;

  chats = [];
  private mutationObserver: MutationObserver;

  constructor(
    private afs: AngularFirestore,
    private storage: Storage,
    private loadingController: LoadingController,
    private avatarService: AvatarService,
    private titleService: Title,
    private analitycs: AnalyticsService,


  ) {
    this.titleService.setTitle('User - Individual Chat');
    this.analitycs.setScreenName('User - Individual Chat');

    this.name = sessionStorage.getItem('name');
    this.oUid = sessionStorage.getItem('oUid');
    this.imagenUrl = sessionStorage.getItem('imagen');
    console.log('esta es la imagen', this.imagenUrl);
    this.uid = sessionStorage.getItem('uid');
    this.fromName = sessionStorage.getItem('fromName');
    this.toEmail = sessionStorage.getItem('toEmail');
    this.toWorkoutId = sessionStorage.getItem('toWorkoutId');
    this.toNutritionId = sessionStorage.getItem('toNutritionId');

    this.messages = this.afs.collection('chats')
      .doc(this.uid)
      .collection('participantes')
      .doc(this.oUid)
      .collection('mensajes', ref => ref.orderBy('time'))
      .valueChanges();

    this.messages.pipe(shareReplay(1)).subscribe(res => {
      console.log(res);
      this.chats = [];
      res.forEach(child => {
        this.chats.push(child);
      });
    });

  }

  ngOnInit() {




  }


  ionViewWillLoad() {
    console.log('Ioni will ener::');
  /*   setTimeout(() => {

      this.scrollToBottom();

    }, 500); */
  }

  async sendMessage() {
    this.afs.collection('chats')
      .doc(this.uid)
      .collection('participantes')
      .doc(this.oUid)
      .collection('mensajes').add({
        time: serverTimestamp(),
        fromUid: this.uid,
        msg: this.newMsg,
        toUid: this.oUid,
        toName: this.name,
        fromName: this.fromName
      }).then(() => {
        this.newMsg = '';
      });

    this.afs.collection('chats')
      .doc(this.oUid)
      .collection('participantes')
      .doc(this.uid)
      .collection('mensajes').add({
        time: serverTimestamp(),
        fromUid: this.uid,
        msg: this.newMsg,
        toUid: this.uid,
        fromName: this.fromName
      }).then(() => {
        this.newMsg = '';
      });

    const messageSent = 1;
    const messageStand = 0;
    this.avatarService.
      setParticipants
      (this.uid, this.oUid,
        serverTimestamp(),
        this.imagenUrl,
        this.oUid,
        this.name,
        messageStand,
        this.fromName,
        this.toEmail,
        this.toWorkoutId,
        this.toNutritionId)
      .then(res => {
        console.log('respuesta respuesta--->', res);
      });

    this.avatarService.updateSpecificMessajeSent(this.oUid, this.uid, messageSent);
    /* this.avatarService.
    setParticipants(this.oUid, this.uid, serverTimestamp(), this.imagenUrl, this.oUid, this.name, messageSent )
    .then(res => {
      console.log('respuesta respuesta--->', res);
    }); */
    const badge = 1;

    this.avatarService.updateRecivedMessage(this.uid, badge);
    this.avatarService.updatePrincipalBadge(this.oUid, badge);

  }

  formatDate(time) {
    const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);

    const fw = formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
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

      this.afs.collection('chats')
        .doc(this.uid)
        .collection('participantes')
        .doc(this.oUid)
        .collection('mensajes')
        .add({
          time: serverTimestamp(),
          fromUid: this.uid,
          msg: this.newMsg,
          imageUrl,
          toUid: this.oUid,
          toName: this.name,
          fromName: this.fromName
        });

      this.afs.collection('chats')
        .doc(this.oUid)
        .collection('participantes')
        .doc(this.uid)
        .collection('mensajes').
        add({
          time: serverTimestamp(),
          fromUid: this.uid,
          msg: this.newMsg,
          imageUrl,
          toUid: this.uid,
          fromName: this.fromName
        }).then(() => {
          this.newMsg = '';
        });


      loading.dismiss();


    }
  }

  scrollToBottom() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    this.content.scrollToBottom();
  }

  scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    this.content.scrollToTop(500);
  }







}
