import { IonItem, ModalController } from '@ionic/angular';
import { ImageModalPage } from './../../auxiliar/image-modal/image-modal.page';
import { ApiInfluencersService } from './../../../services/influencers/api-influencers.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-influencer-abs',
  templateUrl: './influencer-abs.page.html',
  styleUrls: ['./influencer-abs.page.scss'],
})
export class InfluencerAbsPage implements OnInit {

  influencer: any;
  influencerData: any;
  exercisePrograms: any;
  verVideo2 = true;
  verVideo1 = true;

  allItems: Array<any>;
  hideme: any = {};

  visibleIndex = -1;

  allVideos = [];
  uniqueIds = new Set();
  uniqueVideos= [];




  constructor(
    private router: Router,
    private influencerService: ApiInfluencersService,
    private modalCtrl: ModalController
  ) { this.getData(); }

  ngOnInit() {
    console.log('Influencer ABS Page');
  }

  getData() {
    if (this.router.getCurrentNavigation() != null) {

      this.influencer =
        this.router.getCurrentNavigation().extras.state.influencer;
      console.log(this.influencer);

      this.influencerService.influencerVideo(this.influencer, '-nutrition-influencer', true).subscribe(
        (response: any) => {
          this.influencerData = response;
          this.exercisePrograms = this.influencerData.exercise_programs;

          console.log('influencer', this.influencerData);
          console.log('exercise programs::', this.exercisePrograms);
          this.prepareVideos();
        },
        (err) => { }
      );
    }
  }

  async openPreview(img) {
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        img
      },
      cssClass: 'transparent-modal'
    });
    modal.present();
  }

  prepareVideos() {
    console.log('prepare videos');
    this.exercisePrograms.forEach(element => {
      element.days[0].sessions.forEach(item => {
        this.allVideos.push(item.finisher1);
        this.allVideos.push(item.finisher2);
      });

    });

    this.filterUniqueVideos();
    console.log(this.allVideos);
  }

  filterUniqueVideos(){
    const map = new Map();for (const p of this.allVideos) {
      map.set(JSON.stringify(p), p);
    }

   this.uniqueVideos = [...map.values()];
   console.log(this.uniqueVideos);
  }

  anotherFilter(){
    this.uniqueVideos = this.allVideos.filter(
      (m, index, ms) => this.getFirstIndex(ms, m) === index);

      console.log(this.uniqueVideos);

  }
  getFirstIndex(arr, video) {
    return arr.findIndex(
      (a) => a.id === video.id );
  }



  seeVideo(i) {

    if (this.visibleIndex === i) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = i;
    }
  }

}
