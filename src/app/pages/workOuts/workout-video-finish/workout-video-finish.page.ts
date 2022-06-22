import { ImageModalPage } from './../../auxiliar/image-modal/image-modal.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/auxiliar/general.service';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-workout-video-finish',
  templateUrl: './workout-video-finish.page.html',
  styleUrls: ['./workout-video-finish.page.scss'],
})
export class WorkoutVideoFinishPage implements OnInit {

  routine: any;
  exerciseProgram: any;
  videoCtr1: any;
  videoCtr2: any;
  calories: any;
  user: any = {};
  repetitionsTotal: any;
  totalReps: any = [];
  excTime: number;
  verVideo2 = false;
  verVideo1 = false;

  constructor(

    public navCtrl: NavController,
    public generalService: GeneralService,
    public modalCtrl: ModalController,
    public router: Router,

  ) {
    this.routine = {};
    this.exerciseProgram = {};
    if (this.router.getCurrentNavigation().extras.state.routine) {

      this.totalReps = this.router.getCurrentNavigation().extras.state.testing.reduce((a, b) => Number(a) + Number(b));

      console.log(this.totalReps);

      this.excTime = this.router.getCurrentNavigation().extras.state.execTime;
      this.routine = this.router.getCurrentNavigation().extras.state.routine;
      this.exerciseProgram =
        this.router.getCurrentNavigation().extras.state.routine;
      console.log('ESTA ES LA RUTINA:::', this.routine);
    }
  }

  ngOnInit() {

    this.getCal();
    this.getRep();

  }

  getSum(total, num) {
    return total + Math.round(num);
  }

  getCal() {
    const cal =
      Math.round(
        4.5 *
        (this.generalService.user.personal_information.height / 2.205) *
        this.excTime
      ) / 60;
    this.calories = cal.toFixed();
  }

  getRep() {
    const doubledArray = [];
    this.routine.exercises.forEach((value) => {
      const arr = value.details;
      const totalA = arr.reduce(
        (sum, val) => typeof val.repetitions == 'number' ? sum + val.repetitions : sum,
        0
      );
      doubledArray.push(totalA);

    });

    this.repetitionsTotal = doubledArray.reduce(this.getSum, 0);
  }

  seeVideo1() {
    this.verVideo2 = false;
    switch (this.verVideo1) {
      case true:
        this.verVideo1 = false;
        break;

      default:
        this.verVideo1 = true;
        break;
    }

  }
  seeVideo2() {

    this.verVideo1 = false;
    switch (this.verVideo2) {
      case true:
        this.verVideo2 = false;
        break;

      default:
        this.verVideo2 = true;
        break;
    }


  }

  goVideoDetail() {
    this.router.navigate(['/workout-video-details']);
  }

  finish() {
    this.navCtrl.navigateRoot('/home-auth');
  }
  /*  async showShareOptions() {
     const modal = await this.modalCtrl.create({
       component: SocialShareComponent,
       cssClass: "backTransparent",
       backdropDismiss: true,
     });
     return modal.present();
   } */

   async shareOptions(){
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
   }

   async shareImage(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    await Share.share({
      title: 'Check my Image',
      text: 'Really awesome thing you need to see right meow',
      url: image.path,
      dialogTitle: 'Share with buddies',
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
