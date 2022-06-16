import { GeneralService } from './services/auxiliar/general.service';
import { AuthenticationService } from './services/auxiliar/authentication.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CachingService } from './services/auxiliar/caching.service';
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private storageService: CachingService,
    private platform: Platform,
    private translate: TranslateService,
    private router: Router,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private generalService: GeneralService,
    private statusBar: StatusBar



  ) {
    this.storageService.initStorage();

  }

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.translate.addLangs(['en', 'es']);
      this.translate.setDefaultLang('es');
      this.translate.use('es');

      this.authService.authState.subscribe(state => {

        if (state === true) {
          this.userInfo();
        } else {
          if (state === false) {
            this.navCtrl.navigateRoot('login');
          }
        }
      });


    });
  }


  async goInfoApp() {
    this.router.navigateByUrl('app-information');
  }

  async goFunctioning() {
    this.router.navigateByUrl('functioning');
  }

  async goTerms() {
    this.router.navigateByUrl('terms');
  }

  async goContact() {
    this.router.navigateByUrl('contact');
  }

  async goSubscriptions() {
    this.router.navigateByUrl('subscriptions');
  }

  async goProfile() {
    this.router.navigate(['/profile-settings']);
  }

  userInfo() {
    this.storageService.getStorage('user').then((user) => {
      if (user) {
        this.generalService.user = user;
        if (user.has_completed_onboarding) {
          this.navCtrl.navigateRoot(['home-auth']);
        } else {
          this.navCtrl.navigateRoot(['wizard']);
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    App.exitApp();
  }


}
