/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-workout-settings',
  templateUrl: './workout-settings.page.html',
  styleUrls: ['./workout-settings.page.scss'],
})
export class WorkoutSettingsPage implements OnInit {
  @ViewChild('editor') editor;

  exercise: any;
  currentSerie: any;
  currentSerieValueType: number; //1:Weigth 2:repetitions
  currentValue: number;
  showPad: boolean;
  weightUnit: string;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    private userService: UserService,
  ) {
    const queryParams = this.router.getCurrentNavigation().extras.state;
    this.showPad = true;
    this.exercise = queryParams.exercise != undefined ? queryParams.exercise : {};
    this.exercise = queryParams.exercise != undefined ? queryParams.exercise : {};

    console.log('settings');
    console.log(queryParams.exercise);
    console.log(queryParams.serie);

    if (this.exercise.details != null) {
      this.currentSerie = this.exercise.details[0];
      this.currentSerieValueType = this.exercise.pivot.is_time_based ? 1 : 2;
      this.loadCurrentValue();
    } else {
      this.goBack();
    }
    this.weightUnit = 'lbs';
    window.addEventListener('keyboardWillShow', (ev) => {
      // Describe your logic which will be run each time when keyboard is about to be shown.
      //console.log(event.keyboardHeight);
      alert('show keyboard');
    });
  }

  ngOnInit() {
    console.log('WorkoutSettingsPage');
  }

  selectSerie(serie) {
    if (!this.exercise.pivot.is_time_based) {
      if (serie.id == this.currentSerie.id) {
        this.currentSerieValueType = this.currentSerieValueType == 1 ? 2 : 1;
      } else {
        this.currentSerie = serie;
        this.currentSerieValueType = 1;
      }
    } else {
      this.currentSerie = serie;
      this.currentSerieValueType = 1;
    }
    this.loadCurrentValue();
  }

  loadCurrentValue() {
    if (!this.exercise.pivot.is_time_based) {
      this.currentValue = this.currentSerieValueType == 1 ? this.currentSerie.weight_in_kg : this.currentSerie.repetitions;;
    } else {
      this.currentValue = this.currentSerie.repetitions;
    }
  }

  setCurrentValue() {
    if (!this.exercise.pivot.is_time_based) {
      if (this.currentSerieValueType == 1) {
        this.currentSerie.weight_in_kg = parseFloat(this.currentValue.toString());
      } else {
        this.currentSerie.repetitions = parseFloat(this.currentValue.toString());
      }
    } else {
      this.currentSerie.repetitions = parseFloat(this.currentValue.toString());
    }
  }

  keyTouch(key: string) {
    const el = this.editor;
    let actualValue = el.nativeElement.value;
    // let cursor = el.nativeElement.selectionStart ? el.nativeElement.selectionStart : 0;
    const cursor = actualValue.length;

    switch (key) {
      case '.':
        if (cursor == actualValue.length) {
          actualValue = actualValue + '.';
        }
        break;
      case '-1':
        if (cursor > 0) {
          actualValue = cursor == 1 ? actualValue.substring(cursor) :
            actualValue.substring(0, cursor - 1) + actualValue.substring(cursor);
        } else if (cursor == 0 && actualValue.length == 1) {
          actualValue = '';
        }
        break;
      default:
        if (actualValue.length == 4) return;
        if (actualValue) {
          if (cursor == 0) {
            if (actualValue.length == 1) {
              actualValue = key;
            } else {
              actualValue = key + actualValue;
            }
          } else if (cursor == actualValue.length) {
            actualValue = actualValue + key;
          } else {
            actualValue = actualValue.substring(0, cursor) + key + actualValue.substring(cursor);
          }
        } else {
          actualValue = key;
        }
        break;
    }
    if (isNaN(actualValue) || actualValue == '') {
      this.currentValue = 0;
    } else {
      this.currentValue = actualValue.indexOf('.') >= 0 ? actualValue : parseFloat(actualValue);
    }
    this.setCurrentValue();
  }

  sum(key: number) {
    const el = this.editor;
    const actualValue = el.nativeElement.value;

    this.currentValue = parseFloat(actualValue) + key;
    this.setCurrentValue();
  }

  goBack() {
    console.log(JSON.stringify(this.exercise.details));
    switch (this.weightUnit) {
      case 'lbs':
        for (const serie of this.exercise.details) {
          serie.weight_in_kg = this.roundDecimal(Number(Number((serie.weight_in_kg * 2.2046).toFixed(2)).toFixed(3)));
        }
        break;
      default:
        // code...
        break;
    }

    this.userService.updateExerciseProgramDetails({
      exercise_details: this.exercise.details,
    })
      .subscribe((response: any) => {
        this.navCtrl.back();
      }, err => {
        console.log(err);
      });
  }

  goNext() {
    this.goBack();
  }

  hideKeyboard() {
    this.editor.nativeElement.blur();

    /*setTimeout(() => {

    }, 0);*/
    //this.keyboard.eventsAvailable = true;
    //this.keyboard.close();
  }

  roundDecimal(num) {
    if (num % 1 > 0.8) {num = Math.ceil(num);}
    return Number(num);
}

toggleWeightUnit() {
    this.weightUnit = this.weightUnit == 'lbs' ? 'kg' : 'lbs';
    switch (this.weightUnit) {
        case 'kg':
            this.currentValue = this.roundDecimal(Number(Number((this.currentValue / 2.2046).toFixed(2)).toFixed(3)));
            for (const serie of this.exercise.details) {
                serie.weight_in_kg = this.roundDecimal(Number(Number((serie.weight_in_kg / 2.2046).toFixed(2)).toFixed(3)));
            }
            break;

        case 'lbs':
            this.currentValue = this.roundDecimal(Number(Number((this.currentValue * 2.2046).toFixed(2)).toFixed(3)));
            for (const serie of this.exercise.details) {
                serie.weight_in_kg = this.roundDecimal(Number(Number((serie.weight_in_kg * 2.2046).toFixed(2)).toFixed(3)));
            }
            break;
    }
    // this.currentSerie.weight_in_kg = this.currentValue;
    // console.log("this.currentSerie.weight_in_kg toggle", this.currentSerie.weight_in_kg);
}

}
