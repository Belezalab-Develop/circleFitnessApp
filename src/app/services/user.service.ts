import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUser() {
    return this.http.get(`${environment.apiUlr}/me`);
  }

  updateUser(payload) {
    return this.http.patch(`${environment.apiUlr}/me`, payload);
  }

  getChats() {
    return this.http.get(`${environment.apiUlr}/chats`);
  }

  getExerciseProgram() {
    return this.http.get(`${environment.apiUlr}/me/exercise-program`);
  }

  getNutritionProgram() {
    return this.http.get(`${environment.apiUlr}/me/nutrition-program`);
  }

  putExerciseProgram(payload) {
    return this.http.put(`${environment.apiUlr}/me/exercise-program`, payload);
  }

  updateExerciseProgramDetails(payload) {
    return this.http.patch(`${environment.apiUlr}/me/exercise-program/details`, payload);
  }

  putNutritionProgram(payload) {
    return this.http.put(`${environment.apiUlr}/me/nutrition-program`, payload);
  }

  getIndividualUser(email){

    return this.http.get(`${environment.apiUlr}/user/${email}`);
  }
}
