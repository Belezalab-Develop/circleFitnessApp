import { UserService } from './../../../services/user.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { CachingService } from './../../../services/auxiliar/caching.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, NavController, AlertController, ModalController } from '@ionic/angular';
import { WorkoutListParams } from 'src/app/models/workoutlistparams';
import { ImageModalPage } from '../../auxiliar/image-modal/image-modal.page';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
})
export class WorkoutDetailsPage implements OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  workout: any;
  routines: any;
  workoutsTextSearch: string;
  user: any;
  viewList: boolean;
  viewReorder: boolean;
  reorderActive: boolean;
  isFav: boolean;
  viewLocation: boolean;
  influencer: [];
  subscribe = false;
  workoutIndicator = false;
  items = [];
  showMore = false;
  modfText: string;
  custom_url: string;
 


  constructor(
    private navCtrl: NavController,
    private storageService: CachingService,
    private alertCtrl: AlertController,
    private router: Router,
    private userService: UserService,
    private modalCtrl: ModalController

  ) {
    this.user = {};

    if (this.router.getCurrentNavigation().extras.state instanceof WorkoutListParams) {
      this.viewList = (this.router.getCurrentNavigation().extras.state.WorkoutListParams.ShowSubList);
      this.viewLocation = (this.router.getCurrentNavigation().extras.state.WorkoutListParams.ShowLocation);

    }
    else {
      this.viewLocation = false;
      this.viewList = false;
    }

    if (this.router.getCurrentNavigation().extras.queryParams) {
      this.workout = this.router.getCurrentNavigation().extras.queryParams.workout;

      this.isFav = this.workout.is_favourite;
      this.viewReorder = false;
    }

    this.routines = this.workout.routines;
    this.reorderActive = false;
    this.modfText = this.workout.description.split('\n').join('<br />');


  }

  ngOnInit() {
    console.log('WorkoutDetailPage');
    console.log(this.workout);
    this.custom_url = 'https://circlefitness.app/media/';
  }

  setFav(id: number) {};

  showQuestionAboutLocation() {}

  clickSubscribe(flag) {
    this.subscribe = flag;
    this.changeWorkout();
  }

  goBack() {
    if (this.routerOutlet?.canGoBack()) {
      this.navCtrl.pop();
    }else {
      this.navCtrl.navigateRoot('/home-auth');
    }
  }




  selectedWorkoutRoutine(routines: any) {
    if (this.viewReorder) {
      this.router.navigateByUrl('/workouts-details', { state: { routines } });
    }
  }

  goProfile(influencer: any) {
    this.router.navigate(['/explore-profiles'], { queryParams: { influencer } });
  }

  reorderRoutines(event) {
    const dayOfWeek = ['monday', 'tuesday', 'webnesday', 'thursday', 'friday'];



    console.log(event);
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const itemMove = this.routines.splice(event.detail.from, 1)[0];
    console.log(itemMove);
    this.routines.splice(event.detail.to, 0, itemMove);
    event.detail.complete();

    this.routines.forEach((routine, index) => {
      routine.dayOfWeek = dayOfWeek[index];
    });
  }



  goInfluencerDetail(influencer: any) {
    this.router.navigate(['/influencer-detail'], { state: { influencer } });
  }


  async changeWorkout() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      message: `Al dar continuar, va definir su nuevo programa de entrenamiento "${this.workout.label}"`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');

            this.workoutIndicator = true;
            this.userService.putExerciseProgram({
              exercise_program_id: this.workout.id,
            })
              .subscribe((exerciseProgram: any) => {
                console.log('exerciseProgram');
                //console.log(exerciseProgram);
                //this.workout = exerciseProgram;
              }, err => {
                console.log(err);
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async adMessage() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-ad-class',
      message: 'Encuentra tu nuevo programa de entrenamiento',
      buttons: [
        {
          text: 'Aquí ',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '',
          handler: () => {
            console.log('Confirm Okay');

          }
        }
      ]
    });
    await alert.present();
  }

  trimString(text: string, length: number) {
    return text.length > length
      ? text.substring(0, length) + '...'
      : text;
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



