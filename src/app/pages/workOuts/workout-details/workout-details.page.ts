import { AvatarService } from './../../../services/auxiliar/avatar.service';
import { UserService } from './../../../services/user.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { CachingService } from './../../../services/auxiliar/caching.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, NavController, AlertController, ModalController } from '@ionic/angular';
import { WorkoutListParams } from 'src/app/models/workoutlistparams';
import { ImageModalPage } from '../../auxiliar/image-modal/image-modal.page';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { FirebasePerformance } from '@capacitor-firebase/performance';

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
  userUid;



  constructor(
    private navCtrl: NavController,
    private storageService: CachingService,
    private alertCtrl: AlertController,
    private router: Router,
    private userService: UserService,
    private modalCtrl: ModalController,
    private titleService: Title,
    private analitycs: AnalyticsService,
    private avatarService: AvatarService,

  ) {
    this.user = {};

    FirebasePerformance.startTrace({ traceName: 'workout - Detail' });
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

      this.titleService.setTitle(`PLANO DE TREINAMENTO - ${this.workout.label}`);
      this.analitycs.setScreenName(`PLANO DE TREINAMENTO - ${this.workout.label}`);
      this.isFav = this.workout.is_favourite;
      this.viewReorder = false;
    }

    this.routines = this.workout.routines;
    this.reorderActive = false;
    this.modfText = this.workout.description.split('\n').join('<br />');

    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;

    });

    FirebasePerformance.stopTrace({ traceName: 'workout - Detail' });

  }

  ngOnInit() {
    console.log('WorkoutDetailPage');
    console.log(this.workout);
    this.custom_url = 'https://circlefitness.app/media/';
  }

  setFav(id: number) { };

  showQuestionAboutLocation() { }

  clickSubscribe(flag) {
    this.subscribe = flag;
    this.changeWorkout();
  }

  goBack() {
    if (this.routerOutlet?.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.navigateRoot('/home-auth');
    }
  }




 async selectedWorkoutRoutine() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'NOVO TREINO?',
      message: `<p> Uma vez que você escolhe o programa ele será definido como Favorito.</p>
      <p> Você terá aceso em como fazer o exercício.</p> `,
      buttons: [
        {
          text: 'FECHAR',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }
      ]
    });
    await alert.present();


  }

  goProfile(influencer: any) {
    this.router.navigate(['/explore-profiles'], { queryParams: { influencer } });
  }

  reorderRoutines(event) {
    const dayOfWeek = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira'];



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
    this.router.navigate(['/influencer-details'],
      {
        state: { influencer }, replaceUrl: true
      });
  }


  async changeWorkout() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'NOVO TREINO?',
      message: `Seu novo programa de treinamento será: "${this.workout.label}"`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Aceitar',
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


            this.avatarService.updateWorkoutId(this.userUid, this.workout.id);
          }
        }
      ]
    });
    await alert.present();
  }

  async adMessage() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-ad-class',
      message: 'Aqui você encontrará seu novo programa.',
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


}



