import { ImageModalPage } from './../../auxiliar/image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
/* eslint-disable max-len */
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-workout-video-details',
  templateUrl: './workout-video-details.page.html',
  styleUrls: ['./workout-video-details.page.scss'],
})
export class WorkoutVideoDetailsPage implements OnInit {
  @ViewChild('videoPlayer') mVideoPlayer: any;
  routine: any;
  exercise: any = {};
  videoCtr: any;
  //videoOpts: VideoOptions;
  influencer: [];
  custom_url: string;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private modalCtrl: ModalController
  ) {
    this.routine = {};


    this.routine = this.router.getCurrentNavigation().extras.state.exercise ? this.router.getCurrentNavigation().extras.state.exercise : {};
    this.exercise = this.router.getCurrentNavigation().extras.state.exercise ? this.router.getCurrentNavigation().extras.state.exercise : {};
    this.influencer = this.router.getCurrentNavigation().extras.state.influencer ? this.router.getCurrentNavigation().extras.state.influencer : null;

    console.log('this.routine');
    console.log(this.routine);
    console.log(this.influencer);
  }

  ngOnInit() {
    this.custom_url = 'https://circlefitness.app/media/';

    console.log('WorkoutVideoDetailsPage');
  }

  goInfluencerDetail(influencer: any) {
    this.router.navigate(['/influencer-details'],
    { state: { influencer },
    replaceUrl: true
  });
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
