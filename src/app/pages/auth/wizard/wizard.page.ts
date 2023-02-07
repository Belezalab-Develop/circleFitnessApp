/* eslint-disable max-len */
import { CachingService } from './../../../services/auxiliar/caching.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { GeneralService } from './../../../services/auxiliar/general.service';
import { AuthenticationService } from './../../../services/auxiliar/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './../../../services/register.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as _ from 'lodash';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  dateValue = '17/12/1977';
  step = 0;
  progress = 0;
  gender = 'female';
  genderSelected: any = {};
  formMeasurements: FormGroup;
  birthdate = null;
  fatPercentage = null;
  goal: any[] = [];
  experience = null;
  bodySelected = null;
  frequencyGym = null;
  footRestriction = null;
  bgGender = '../../assets/imgs/bg-login.jpg';
  pathLocationImage = '../../assets/icon/';
  genders: any[] = [];
  bodies: any[] = [];
  user: any[] = [];

  constructor(
    private registerService: RegisterService,
    private formB: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private gnrlService: GeneralService,
    private storageService: CachingService,
    private titleService: Title,
    private analitycs: AnalyticsService,
  ) {

    this.titleService.setTitle('Cadastro - User - Data');
    this.analitycs.setScreenName('Cadastro - User - Data');

    this.genders = [
      {
        type: 1,
        label: 'Mulher',
        isSelected: false,
        value: 'f'
      },
      {
        type: 2,
        label: 'Homen',
        isSelected: false,
        value: 'm'
      },
      {
        type: 3,
        label: 'Outro',
        isSelected: false,
        value: 'o'
      },
    ];
    this.bodies = [
      {
        type: 1,
        label: 'Ectomorfo',
        isSelected: false,
        value: 'ectomorph',
        descrip: 'Corpo mais magro e esguio, ombros estreitos e membros compridos.'
      },
      {
        type: 2,
        label: 'Mesomorfo',
        isSelected: false,
        value: 'mesomorph',
        descrip: 'Corpo magro e musculoso, mesmo que não pratique atividade física. Tronco desenvolvido, pouca gordura abdominal, cintura  fina e metabolismo rápido. '
      },
      {
        type: 3,
        label: 'Endomorfo',
        isSelected: false,
        value: 'endomorph',
        descrip: 'Baixa estatura, corpo mais arredondado e mais largo. '
      },
    ];
  }

  ngOnInit() {
    this.buildFormMeasurements();
    this.storageService.getStorage('user').then(user => {
      if (user) {
        if (user.has_completed_onboarding) {
          this.router.navigate(['/home-auth'], { replaceUrl: true });
        } else {
          this.user = user;
        }
      }
    });

  }

  buildFormMeasurements() {
    this.formMeasurements = this.formB.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  formatDate(value: string) {
    return format(parseISO(value), 'yyyy-MM-dd');
  }

  async nextButton() {
    await this.clickNext();
    if (this.step >= 9) {
      return;
    }

  }

  async clickNext() {
    console.log(this.step);
    if (this.step === 0) { // save gender
      this.setGender(this.genderSelected.value);
    }
    if (this.step === 1) { // save birthdate
      this.setBirthdate(this.birthdate, this.dateValue);
    }
    if (this.step === 2) { // save Measurements
      this.setMeasurements(this.formMeasurements.value);
    }
    if (this.step === 3) { // save fatPercentage
      this.setFatPercentage(this.fatPercentage);
    }
    if (this.step === 4) { // save goal
      this.setGoal(this.goal);
    }
    if (this.step === 5) { // save experience
      this.setExperience(this.experience);
    }
    if (this.step === 6) { // save body
      this.setBody(this.bodySelected.value);
    }
    if (this.step === 7) { // save gym frequency
      this.setGymFrequency(this.frequencyGym);
    }
    if (this.step === 8) { // save foot restriction
      this.setFootRestriction(this.footRestriction);
    }
  }

  previousButton() {
    if (this.progress <= 0) {
      return;
    }
    if (this.progress >= 8) {
      this.step = this.step - 2;
      this.progress = this.step / 9;
      console.log('ultimo: ', this.step);
    } else {
      this.step = this.step - 1;
      this.progress = this.step / 9;
      console.log('step: ', this.step);
    }
  }

  getBgConetent(gender) {
    if (gender === 1) {
      this.bgGender = '../../assets/imgs/bg-female.jpg';
      this.gender = 'female';
    }
    if (gender === 2) {
      this.bgGender = '../../assets/imgs/bg-male.jpg';
      this.gender = 'male';
    }
    if (gender === 3) {
      this.bgGender = '../../assets/imgs/bg-login.jpg';
      this.gender = 'male';
    }
  }

  selectLocationOk(genders, selection) {
    _.each(genders, function (gender) {
      if (gender.type !== selection.type) {
        gender.isSelected = false;
      }
    });
    selection.isSelected = true;

    this.genderSelected = selection;
    console.log(this.genderSelected);
    this.getBgConetent(selection.type);

  }

  selectBodyOk(bodies, selection) {
    _.each(bodies, function (body) {
      if (body.type !== selection.type) {
        body.isSelected = false;
      }
    });

    selection.isSelected = true;
    this.bodySelected = selection;
    console.log(this.bodySelected);
  }



  // methods apis

  setGender(gender) {
    if (gender == null) {
      this.gnrlService.showToast('Oops! Você tem que escolher uma opção para avançar', 'toast-success');
      return;
    }
    this.registerService.saveGender(gender).subscribe(response => {
      console.log(response);
      this.step = this.step + 1;
      this.progress = this.step / 9;
      this.gnrlService.showToast('Foi atualizado corretamente', 'toast-success');
    }, err => {
      this.gnrlService.showToast('Oops! Verifique os dados', 'toast-success');
      return;
    });
  }

  setBirthdate(birthdate, dateValue) {

    console.log(dateValue);


    this.registerService.saveBirthdate(dateValue).subscribe(response => {
      console.log(response);
      this.step = this.step + 1;
      this.progress = this.step / 9;
      this.gnrlService.showToast('Foi atualizado corretamente', 'toast-success');
    }, err => {
      this.gnrlService.showToast('Oops! Verifique os dados', 'toast-success');
      return;
    });
  }

  setMeasurements(measurements) {
    if (measurements == null) {
      this.gnrlService.showToast('Oops! Você deve inserir as medidas', 'toast-success');
      return;
    }

    /* if (130 > measurements.height || measurements.height > 250) {
      this.gnrlService.showToast('Oopps! Preencha a altura corretamente', 'toast-success');
      return;
    } */

    if (20 > measurements.weight || measurements.weight > 300) {
      this.gnrlService.showToast('Oops! Preencher o peso para avançar!', 'toast-success');
      return;
    }

    this.registerService.saveMeasurements(measurements).subscribe(response => {
      console.log(response);
      this.step = this.step + 1;
      this.progress = this.step / 9;
      this.gnrlService.showToast('Foi atualizado corretamente', 'toast-success');
    }, err => {
      this.gnrlService.showToast('Oops! Verifique os dados', 'toast-success');
      return;
    });
  }

  setFatPercentage(fatPercentage) {
    if (fatPercentage == null) {
      this.gnrlService.showToast('Oops! Você deve inserir a porcentagem', 'toast-success');
      return;
    }

    if (0 > fatPercentage || fatPercentage > 100) {
      this.gnrlService.showToast('Oops! Revisa que el porcentaje sea correcto', 'toast-success');
      return;
    }

    this.registerService.saveFatPercentage(fatPercentage).subscribe(response => {
      console.log(response);
      this.step = this.step + 1;
      this.progress = this.step / 9;
      this.gnrlService.showToast('Foi atualizado corretamente', 'toast-success');
    }, err => {
      this.gnrlService.showToast('Oops! Verifique os dados', 'toast-success');
      return;
    });
  }

  setGoal(goal) {
    if (goal.length === 0) {
      this.gnrlService.showToast('Oops! Você tem que escolher uma opção para avançar', 'toast-success');
      return;
    }
    this.registerService.saveGoal(goal).subscribe(response => {
      console.log(response);
      this.step = this.step + 1;
      this.progress = this.step / 9;
      this.gnrlService.showToast('Foi atualizado corretamente', 'toast-success');
    }, err => {
      this.gnrlService.showToast('Oops! Verifique os dados', 'toast-success');
      return;
    });
  }

  setExperience(experience) {
    if (experience == null) {
      this.gnrlService.showToast('Oops! Você tem que escolher uma opção para avançar', 'toast-success');
      return;
    }


    this.registerService.saveExperience(experience).subscribe(response => {
      console.log(response);
      this.step = this.step + 1;
      this.progress = this.step / 9;
      this.gnrlService.showToast('Foi atualizado corretamente', 'toast-success');
    }, _err => {
      this.gnrlService.showToast('Oops! Verifique os dados', 'toast-success');
      return;
    });
  }

  setBody(body) {
    if (body == null) {
      this.gnrlService.showToast('Oops! Você tem que escolher uma opção para avançar', 'toast-success');
      return;
    }
    this.registerService.saveBody(body).subscribe(response => {
      console.log(response);
      this.step = this.step + 1;
      this.progress = this.step / 9;
      this.gnrlService.showToast('Foi atualizado corretamente', 'toast-success');
    }, err => {
      this.gnrlService.showToast('Oops! Verifique os dados', 'toast-success');
      return;
    });
  }

  setGymFrequency(frequency) {
    console.log(Number(frequency));
    if (frequency == null) {
      this.gnrlService.showToast('Oops! Você tem que escolher uma opção para avançar', 'toast-success');
      return;
    }
    let gym_min_weekly_frequency: number;
    let gym_max_weekly_frequency: number;
    if (Number(frequency) === 1) {
      gym_min_weekly_frequency = 1;
      gym_max_weekly_frequency = 3;

    }
    if (Number(frequency) === 2) {
      gym_min_weekly_frequency = 4;
      gym_max_weekly_frequency = 5;
    }
    if (Number(frequency) === 3) {
      gym_min_weekly_frequency = 5;
      gym_max_weekly_frequency = null;
    }

    console.log(gym_min_weekly_frequency);
    console.log(gym_max_weekly_frequency);
    const data = {
      gym_min_weekly_frequency,
      gym_max_weekly_frequency
    };

    console.log(data);

    this.registerService.saveGymFrequency(data).subscribe(response => {
      console.log(response);
      this.step = this.step + 1;
      this.progress = this.step / 9;
      this.gnrlService.showToast('Foi atualizado corretamente', 'toast-success');
    }, err => {
      this.gnrlService.showToast('Oops! Verifique os dados', 'toast-success');
      return;
    });
  }

  setFootRestriction(foot) {
    if (foot == null) {
      this.gnrlService.showToast('Oops! Você tem que escolher uma opção para avançar', 'toast-success');
      return;
    }
    this.registerService.saveFoodRestrictions(foot).subscribe(response => {
      console.log(response);
      this.step = this.step + 1;
      this.progress = this.step / 9;
      this.authService.setUserStorage();
      // this.generalService.showToast('Se actualizo correctamente', 'toast-success');
      this.router.navigate(['/home-auth'], { replaceUrl: true });
    }, err => {
      this.gnrlService.showToast('Oops! occurrio un problema', 'toast-success');
      return;
    });
  }


}
