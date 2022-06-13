/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../user.service';
import { GeneralService } from './general.service';
import { CachingService } from './caching.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { client, environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authState = new BehaviorSubject(false);
  constructor(
    public router: Router,
    private http: HttpClient,
    public storageService: CachingService,
    private platform: Platform,
    public toastController: ToastController,
    public generalService: GeneralService,
    private userService: UserService
  ) {

     this.platform.ready().then(async () => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storageService.getStorage('TOKEN_INFO').then(response => {
      console.log(response);
      if (response) {
        this.authState.next(true);
      }
    });
  }

  loginEmail(credentials: any) {

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');

    const data = {
      client_secret: client.client_secret,
      client_id: client.client_id,
      username: credentials.email,
      password: credentials.password,
      grant_type: client.grant_type
    };

    return this.http.post(environment.apiAuth, data, { headers });
  }

  async saveStorageLogin(token: any) {

    this.storageService.setStorage('TOKEN_INFO', token).then(async response => {
      if (response) {
        this.authState.next(true);

        this.setUserStorage();
      }
    });
  }

  setUserStorage() {
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        if (user.has_completed_onboarding) {
          this.router.navigate(['/home-auth'], { replaceUrl: true });

        } else {
          this.router.navigate(['/wizard'], { replaceUrl: true });

        }
        //TODO: Agregar aqui logica para cach informacion de la informacion de home Auth
        this.generalService.user = user;
        this.storageService.setStorage('user', user).then(response => {
          if (response) {
            console.log('se almaceno el usuario correctamente ', user);
          }
        });
      }
    }, err => {
      console.log(err);
    });
  }

  async logout() {
    this.storageService.remove('user').then(() => { });
    this.storageService.remove('TOKEN_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }






}
