import { ModalController } from '@ionic/angular';
import { ImageModalPage } from './../../auxiliar/image-modal/image-modal.page';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-influencer-lifestyle',
  templateUrl: './influencer-lifestyle.page.html',
  styleUrls: ['./influencer-lifestyle.page.scss'],
})
export class InfluencerLifestylePage implements OnInit {

  info = false;
  showMore = false;
  custom_url: string;
  temp_url: any;

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('influencer live style page');

    if (this.router.getCurrentNavigation().extras.state) {
      this.info = this.router.getCurrentNavigation().extras.state.influencer;
      this.custom_url = 'https://circlefitness.app/media/';
      console.log(this.custom_url);
      console.log(this.info);
    }

  }

  async openPreview(img){
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img
      },
      cssClass: 'transparent-modal'
    });
    modal.present();
  }

}
