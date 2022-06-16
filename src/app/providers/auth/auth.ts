/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
// import { App } from 'ionic-angular/components/app/app';
import { NavController } from '@ionic/angular';

const AUTH_KEY = 'auth';

@Injectable()
export class AuthProvider {


  nav: NavController;

  constructor(/*public app: App*/) {
    // this.nav = this.app.getRootNavs()[0];
  }

  public auth() {
    return JSON.parse(localStorage.get(AUTH_KEY));
  }

  public isAuth() {

    if (localStorage.getItem(AUTH_KEY) == null) {
      setTimeout(() => {
        this.nav.navigateRoot('LoginPage');
      }, 0);
      return false;
    }
    return true;
  }

  public login(username: string, password: string) {
    if (username === 'abcd' && password === '1') {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ username: 'abcd', first_name: 'Jonh', last_name: 'Doe', notifications: [] }));
      setTimeout(() => {
        this.nav.navigateRoot('HomeAuthPage');
      }, 0);
      return true;
    }
    return false;
  }
}
