/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


export interface CountdownTimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}




@Component({
  selector: 'app-user-workout-details',
  templateUrl: './user-workout-details.page.html',
  styleUrls: ['./user-workout-details.page.scss'],
})
export class UserWorkoutDetailsPage implements OnInit {

  timeInSeconds: number;
  timer: CountdownTimer;
  routine: any;
  selected: number;
  isStarted: boolean;
  htmlToAdd: any;
  totalRepetitions: any = [];
  exerciseSerieLength: any;
  exerciseDetails: any = [];

  initialIndex: any;
  ind: any;
  excerciseDetails: any;
  timeExercise: any;
  timeIndex: any;
  lastExercise: boolean;
  exercisesLength: boolean;
  serieTime: any;


  timeProgress: number;
  timeLeft: string;
  currentTimeCounter: any;
  influencer: [];
  time = 0;
  play: boolean;
  interval;
  bottonText: string;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public router: Router
  ) {
    this.selected = 0;
    //this.timeInSeconds = 0;

    if (this.router.getCurrentNavigation().extras.state.routine) {
      this.routine = this.router.getCurrentNavigation().extras.state.routine;
      this.influencer = this.router.getCurrentNavigation().extras.state.influencer;
      console.log(this.routine);
      console.log(this.influencer);
    }
  }

  ngOnInit() {
    console.log('USER WORKOUT DETAILS');


    this.isStarted = false;
  }

  editExerciseSeries(exercise: any, serie: any) {

    console.log(exercise);
    console.log(serie);
    this.router.navigateByUrl('workout-settings', {
      state: { exercise, serie },
    });
  }

  startWorkout() {

    this.isStarted = true;
    this.startWorkTimer();
    this.selected = 1;
    this.bottonText = 'Completa la serie';
    this.initialIndex = 0;
    const i = 0;
    this.nextExercise(this.routine.exercises[0].id);
    this.setExerciseStatus(i, this.routine.exercises[0].id, 1);

  }
  finishWorkout() {
    this.finish();
  }

  async finish() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Finalizar Workout?',
      message: '¿Has completado todos los ejercicios del workout?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
            this.isStarted = false;
            this.selected = 0;
            this.router
              .navigate(['/workout-video-finish'], {
                state: {
                  routine: this.routine,
                  testing: this.totalRepetitions,
                  execTime: (this.time / 60).toFixed(),
                },
              })
              .then(() => {
                this.isStarted = false;
                this.selected = 0;
                this.pauseWorkTimer();

                console.log(this.routine);

              });
          },
        },
      ],
    });
    await alert.present();
  }

  onClickExercise(exercise: any, influencer: any) {
    this.openExerciseVideo(exercise, influencer);
  }

  openExerciseVideo(exercise: any, influencer: any) {
    this.router.navigate(['/workout-video-details'], {
      state: {
        exercise,
        influencer
      },
    });
  }

  goToSerie(exercise, index) {
    if (exercise.details.length > index) {
      exercise.current_serie_index = index;
      this.setExerciseStatus(index, exercise.id, 1);
    }
  }


  setCompleteSerie(i: any, exercise_id: any) {
    console.log(i);
    console.log(exercise_id);

    const exercise = this.routine.exercises.find((r) => r.id === exercise_id);
    this.exerciseSerieLength = exercise.details.length;
    this.exerciseDetails = exercise.details;
    const index = this.routine.exercises.indexOf(exercise);
    const ind = i;
    const lastExercise: boolean = this.routine.exercises.length - 1 === index;
    const exercisesLength: boolean = this.routine.exercises.length;


    console.log('Largo de los ejercicios del workout', exercisesLength);
    console.log('Largo de la serie seleccionada', this.exerciseSerieLength);
    console.log('Detalle del ejercicio', this.exerciseDetails);
    console.log('index', index);
    console.log('ind', ind);
    console.log('Indice del ejercicio actual', ind);
    console.log('Ultimo ejercicio', lastExercise);
    console.log('Tipo de ejercicio', exercise.type);
    console.log('EJERCICIO::', exercise);
    console.log('EJERCICIO TYPO::', exercise.pivot.is_time_based);


    const test = exercise.details[ind].id;

    const element = document.getElementById(test);
    const rep = element.dataset.serie_rep;

    this.totalRepetitions.push(rep);
    console.log(this.totalRepetitions);
    element.style.color = 'white';
    this.initialIndex = ind + 1;




    switch (lastExercise) {
      case true:
        console.log('EN EL ULTIMO EJERCICIO');
        if (this.exerciseSerieLength === ind + 1) {
          console.log('Este es la ultima serie');

          this.finish();
        }
        break;

      default:
        if (this.exerciseSerieLength === ind + 1) {
          console.log('Este es la ultima serie');
          const newIndex = index + 1;
          const newExercise = this.routine.exercises[newIndex].id;
          this.initialIndex = 0;
          this.nextExercise(newExercise);
        }
        break;
    }


  }

  setTimerComplete(i: any, exercise_id: any) {

    console.log(i);
    console.log(exercise_id);
    this.timeExercise = this.routine.exercises.find((r) => r.id === exercise_id);
    const currentSerie = this.timeExercise.details[i];
    console.log(currentSerie);
    this.exerciseSerieLength = this.timeExercise.details.length;
    this.exerciseDetails = this.timeExercise.details;
    this.timeIndex = this.routine.exercises.indexOf(this.timeExercise);
    this.ind = i;
    const test = this.timeExercise.details[this.ind].id;
    this.excerciseDetails = document.getElementById(test);
    this.lastExercise = this.routine.exercises.length - 1 === this.timeIndex;
    this.exercisesLength = this.routine.exercises.length;
    this.serieTime = currentSerie.repetitions;

    this.bottonText = 'inicia la Serie';

    this.timeInSeconds = this.serieTime;
    this.timeProgress = this.serieTime;
    this.initTimer();
    this.startTimer();


    console.log('INDICE DE LA SERIE::', this.ind);
    console.log('EJERCICIO::', this.timeExercise);
    console.log('TIEMPO DE LA SERIE::', this.serieTime);



  }

  setTestTimer() {

    this.excerciseDetails.style.color = 'white';
    this.initialIndex = this.ind + 1;

    switch (this.lastExercise) {
      case true:
        console.log('EN EL ULTIMO EJERCICIO');
        if (this.exerciseSerieLength === this.ind + 1) {
          console.log('Este es la ultima serie');

          this.finish();
        }
        break;

      default:
        if (this.exerciseSerieLength === this.ind + 1) {
          console.log('Este es la ultima serie');
          const newIndex = this.timeIndex + 1;
          const newExercise = this.routine.exercises[newIndex].id;
          this.initialIndex = 0;
          this.nextExercise(newExercise);
        }
        break;
    }
  }

  setExerciseStatus(i: any, exercise_id: any, status: number) {
    const exercise = this.routine.exercises.find((r) => r.id === exercise_id);
    this.exerciseSerieLength = exercise.details.length;
    this.exerciseDetails = exercise.details;
    const index = this.routine.exercises.indexOf(exercise);
    const ind = i;
    const lastExercise: boolean = this.routine.exercises.length - 1 === index;
    const exercisesLength: boolean = this.routine.exercises.length;
    const lastSerie = exercise.current_serie_index === exercise.details.length - 1;



    if (this.currentTimeCounter) { clearInterval(this.currentTimeCounter); }

    if (exercise.type === 1) {
      switch (exercise.status) {
        case 0:
          break;
        case 1:
          break;
        case 2:

          this.initTimeCount(
            exercise.pivot.rest_time_between_sets_in_seconds,
            lastExercise ? 3 : 5
          );
          break;
        case 3:
          break;
        case 4:
          if (index < this.routine.exercises.length - 1) {
            this.selected = this.routine.exercises[index + 1].id;
          }
          break;
      }
    } else if (exercise.type === 2) {
      switch (exercise.status) {
        case 0:
          break;
        case 1:
          exercise.current_serie_index = 0;
          // this.initTimeCount(exercise.details[exercise.current_serie_index].duration_time, 2);
          this.initTimeCount(
            exercise.details[exercise.current_serie_index].repetitions,
            2
          );
          break;
        case 2:
          // this.initTimeCount(exercise.details[exercise.current_serie_index].rest_time, lastExercise ? 3 : 5);
          this.initTimeCount(
            exercise.pivot.rest_time_between_sets_in_seconds,
            lastExercise ? 3 : 5
          );
          break;
        case 3:
          break;
        case 4:
          if (index < this.routine.exercises.length - 1) {
            this.selected = this.routine.exercises[index + 1].id;
          }
          break;
      }
    }
  }

  startWorkTimer() {
    this.play = true;
    this.interval = setInterval(() => {
      this.time++;
    }, 1000);
  }

  pauseWorkTimer() {
    this.play = false;
    clearInterval(this.interval);
  }

  initTimeCount(minutes: number, next_status: number) {
    this.timeProgress = 0;
    this.timeLeft =
      (minutes < 10 ? '0' + minutes.toString() : minutes.toString()) + ':00';
    const totalSecond = minutes * 60;
    let sumSeconds = 0;
    const dt = new Date();
    dt.setMinutes(minutes);
    dt.setSeconds(0);
    this.currentTimeCounter = setInterval(() => {
      dt.setSeconds(dt.getSeconds() - 1);
      this.timeLeft =
        (dt.getMinutes() < 10
          ? '0' + dt.getMinutes().toString()
          : dt.getMinutes()) +
        ':' +
        (dt.getSeconds() < 10
          ? '0' + dt.getSeconds().toString()
          : dt.getSeconds());
      sumSeconds++;
      this.timeProgress = ((sumSeconds / totalSecond) * 100) / 100;
      console.log('aquí va el incremento', this.timeProgress);
      if (sumSeconds >= totalSecond) {
        clearInterval(this.currentTimeCounter);
        const exercise = this.routine.exercises.find(
          (r) => r.id === this.selected
        );
        if (exercise.type === 1) {
          this.doFinishRest(this.selected);
        } else {
          const i = 0;
          this.setExerciseStatus(i, this.selected, next_status);
        }
      }
    }, 1000);
  }

  doFinishRest(exercise_id) {
    const exercise = this.routine.exercises.find((r) => r.id === exercise_id);

    if (exercise.current_serie_index < exercise.details.length - 1) {
      exercise.status = 1;
      exercise.current_serie_index += 1;
    } else {
      const i = 2;
      this.setExerciseStatus(i, exercise_id, 3);
    }
  }

  nextExercise(id) {
    if (this.selected === 0) {
      return;
    }

    if (id !== this.selected) {
      this.selected = id;
    }
  }

  goInfluencerDetail(influencer: any) {
    console.log(influencer);
    this.router.navigate(['/influencer-detail'], {
      state: { influencer },
    });
  }


  //COUNTDOWN
  hasFinished() {
    console.log('termino contador 1');
    return this.timer.hasFinished;
  }

  initTimer() {
    if (!this.timeInSeconds) { this.timeInSeconds = 0; }

    this.timer = <CountdownTimer>{
      seconds: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  pauseTimer() {
    this.timer.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer) { return; }
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
      } else {
        this.timer.hasFinished = true;
        console.log('termino contador');
        this.setTestTimer();
      }

    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

}
