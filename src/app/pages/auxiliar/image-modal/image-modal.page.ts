import { SwiperComponent } from 'swiper/angular';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { SwiperOptions, Zoom } from 'swiper';
SwiperCore.use([Zoom]);


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  @Input()img: string;
  config: SwiperOptions ={
    zoom:true
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  zoom(zoomIn){

    const zoom = this.swiper.swiperRef.zoom;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    zoomIn ? zoom.in() : zoom.out();

  }

  close(){
    this.modalCtrl.dismiss();
  }

}
