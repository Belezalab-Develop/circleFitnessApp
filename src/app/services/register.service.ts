/* eslint-disable @typescript-eslint/naming-convention */
import { CachingService } from './auxiliar/caching.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: CachingService
  ) { }

  register(user) {
    const data = {
      name: user.name,
      paternal_surname: user.paternal_surname,
      email: user.email,
      nick_name: user.nick_name,
      password: user.password
    };
    return this.http.post(`${environment.apiUlr}/register`, data);
  }

  saveGender(gender) {
    const data = {
      gender
    };
    return this.http.put(`${environment.apiUlr}/me/gender`, data);
  }

  saveBirthdate(birthdate) {
    const data = {
      birthdate
    };
    return this.http.put(`${environment.apiUlr}/me/birthdate`, data);
  }

  saveMeasurements(measurements) {
    const data = {
      weight: measurements.weight,
      height: measurements.height
    };
    return this.http.put(`${environment.apiUlr}/me/measurements`, data);
  }

  saveFatPercentage(fatPercentage) {
    const data = {
      fat_percentage: fatPercentage
    };
    return this.http.put(`${environment.apiUlr}/me/fat-percentage`, data);
  }

  saveGoal(goal) {
    const data = {
      goal
    };
    return this.http.put(`${environment.apiUlr}/me/goal`, data);
  }

  saveExperience(experience) {
    const data = {
      experience
    };
    return this.http.put(`${environment.apiUlr}/me/experience`, data);
  }

  saveBody(body) {
    const data = {
      body
    };
    return this.http.put(`${environment.apiUlr}/me/body`, data);
  }

  saveGymFrequency(frequency) {
    return this.http.put(`${environment.apiUlr}/me/gym-frequency`, frequency);
  }

  saveFoodRestrictions(foot) {

    const data = {
      food_restrictions: foot
    };
    return this.http.put(`${environment.apiUlr}/me/food-restrictions`, data);
  }

  async saveStorageTokenWizard(token: any) {
    // tslint:disable-next-line: variable-name
    console.log('token save wizard: ' + JSON.stringify(token));
    /// this.deviceService.setStorage('toke', user.access_token);
    this.storageService.setStorage('TOKEN_INFO', token).then(async (response) => {
        if (response) {
            this.router.navigateByUrl('wizard');
        }
    });

}
}
