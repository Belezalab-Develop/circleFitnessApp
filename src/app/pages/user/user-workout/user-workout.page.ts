import { LoadingController } from '@ionic/angular';
/* eslint-disable no-console */
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-user-workout',
  templateUrl: './user-workout.page.html',
  styleUrls: ['./user-workout.page.scss'],
})
export class UserWorkoutPage implements OnInit {

  workout: any;
  routines: any = {};
  goals: [];
  levels: [];
  workoutsTextSearch: string;
  user: any = {};
  viewList = false;
  viewReorder = true;
  reorderActive = false;
  isFav = true;
  viewLocation = false;
  influencer: [];
  subscribe = true;
  exerciseProgram: any = null;
  showMore = false;
  isLoaded = true;

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    private alertCtrl: AlertController,
    public router: Router,
    private titleService: Title,
    private analitycs: AnalyticsService,
    private loadingController: LoadingController,
  ) {

  }

  async ngOnInit() {
    console.info('USER WORKOUT');
    //TODO: pasar eso a storage en el inicio y llamar  desde ahi.

    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'
    });

    loading.present();
    this.userService.getExerciseProgram().subscribe(
      (exerciseProgram: any) => {

        if (exerciseProgram !== null) {
          this.exerciseProgram = exerciseProgram;
          this.routines = this.exerciseProgram.days[0].sessions;
          this.goals = this.exerciseProgram.prog.goals;
          this.levels = this.exerciseProgram.prog.levels;
          console.log('WORKOUT   :>> ', exerciseProgram);
          this.titleService.setTitle(`USER - PLANO DE TREINAMENTO - ${this.exerciseProgram.label}`);
          this.analitycs.setScreenName(`USER - PLANO DE TREINAMENTO - ${this.exerciseProgram.label}`);
          this.isLoaded = false;
          loading.dismiss();
        } else {
          this.exerciseProgram = null;
          this.isLoaded = false;
          loading.dismiss();
        }



      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectedWorkoutRoutineOutside(routines: any) {
    if (this.viewReorder) {
      this.router.navigateByUrl('/user-workout-details', {
        state: {
          routine: routines.days[0].sessions[0],
          influencer: routines.influencer,
        },
      });
    }
  }

  selectedWorkoutRoutine(routines: any, influencer: any) {
    console.log(routines);
    console.log(influencer);
    if (this.viewReorder) {
      this.router.navigateByUrl('/user-workout-details', {
        state: { routine: routines, influencer },
      });
    }
  }

  goInfluencerDetail(influencer: any) {
    console.log(influencer);
    this.router.navigate(['/influencer-details'], {
      state: { influencer },
      replaceUrl: true
    });
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


  trimString(text, length) {
    return text.length > length
      ? text.substring(0, length) + '...'
      : text;
  }

}
