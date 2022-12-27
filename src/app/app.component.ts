import { NotificationsService } from './services/auxiliar/notifications.service';
import { UserService } from './services/user.service';
import { GeneralService } from './services/auxiliar/general.service';
import { AuthenticationService } from './services/auxiliar/authentication.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CachingService } from './services/auxiliar/caching.service';
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { App } from '@capacitor/app';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Smartlook, SmartlookSetupConfig } from '@awesome-cordova-plugins/smartlook/ngx';

//import { Stripe } from '@capacitor-community/stripe';

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
    private statusBar: StatusBar,
    private notificatiosService: NotificationsService,
    private smartlook: Smartlook

  ) {
    this.storageService.initStorage();
    this.createCaheFolder();
    this.notificatiosService.inicializar();
    /*  Stripe.initialize({

       publishableKey: 'pk_test_51HsR5iH2JpR7iSTHBXQquHJEkcYjQkkQQi3s6lkzzXQHdDOecM84Xl88abg1yQVpZWBkTYxHJ7T9vG2jRqgLMZqC00ubQqsVDQ',

     }); */

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

      console.log('app component');

      this.authService.authState.subscribe(state => {

        if (state === true) {
          this.userInfo();
        } else {
          if (state === false) {
            this.navCtrl.navigateRoot('login');
          }
        }
      });
      this.smartlook.setupAndStartRecording(new SmartlookSetupConfig('2fa7b73903eea3c32a6091ab66b3ea7d6ab951e1'));

    });
  }
  async createCaheFolder() {

    try {
      const ret = await Filesystem.mkdir({
        directory: Directory.Cache,
        path: `CACHE-IMG`
      });
      console.log('folder ', ret);
    } catch (e) {
      //console.error("Unable to make directory", e);
    }

  }



  /* async goInfoApp() {
    this.router.navigateByUrl('app-information');
  } */

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

  async goGalery() {
    this.router.navigateByUrl('user-galery');
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
