import { AvatarService } from './../../../services/auxiliar/avatar.service';
import { FirebaseService } from './../../../services/auxiliar/firebase.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthenticationService } from './../../../services/auxiliar/authentication.service';
import { CachingService } from './../../../services/auxiliar/caching.service';
import { RegisterService } from './../../../services/register.service';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = false;
  register = false;
  formRegister: FormGroup;
  formLogin: FormGroup;
  loading;
  retryPass = '';

  constructor(
    private formB: FormBuilder,
    private router: Router,
    private menuCtrl: MenuController,
    private userService: UserService,
    private loadingController: LoadingController,
    private registerService: RegisterService,
    private toastController: ToastController,
    private alertController: AlertController,
    private navController: NavController,
    private firebaseService: FirebaseService,
    public storageService: CachingService,
    public authenticationService: AuthenticationService,
    private avatarService: AvatarService,

  ) { }

  ngOnInit() {
    console.log('login');
    this.buildRegisterForm();
    this.buildLoginForm();
    this.menuCtrl.enable(false);
  }

  async showLoader() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento por favor...',
    });
    await this.loading.present();
  }

  async login() {
    this.showLoader();

    this.authenticationService.loginEmail(this.formLogin.value).subscribe(token => {
      this.loading.dismiss();
      if (token) {
        //TODO: Agregar analityss, set user, log user
        console.log(this.formLogin.value);
        this.saveUserInfo(token);

        this.firebaseLoginLogic();


      }
    }, async err => {
      this.loading.dismiss();
      console.log('error', err.error.message);

      const msg = err.error.message;
      this.errorAlert(msg);

    });
  }

  async saveUserInfo(res) {
    if (res !== null) {
      this.authenticationService.saveStorageLogin(res);
    }
  }

  async saveUserStorage(user) {
    if (user !== null) {
      console.log('user-storage: ' + JSON.stringify(user));
      // this.authService.saveUserStorage(user);
    }
  }

  firebaseLoginLogic() {
    this.firebaseService.signIn(this.formLogin.value).then(
      (res) => {
        const uid= res.user.uid;
        this.storageService.setStorage('user_uid', uid).then();
        this.storageService.getStorage('push_token').then(response => {
          if (response) {
            const token = response;
            const userUpdate = {
              token,
            };
            this.avatarService.updateToken(uid, userUpdate);
          }
        });

      }).catch(
        async (err) => {

          this.storageService.getStorage('user').then(data => {
            if (data) {
              this.firebaseSinUpLogic();
            } else {
              console.log('no se por qu etarda.......');
            }
          });

          console.log('error login page:: ' + err.message);


        });


  }

  firebaseSinUpLogic() {
    this.storageService.getStorage('user').then(result => {
      const form = this.formLogin.value;
      const data = {
        email: form.email,
        password: form.password,
        nickName: result.nick_name
      };

      this.firebaseService.signup(data).then(res => { })
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .catch(err => {

          console.log('error: ' + err.message);
        });
    });
  }

  buildLoginForm() {
    this.formLogin = this.formB.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  buildRegisterForm() {
    this.formRegister = this.formB.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      paternal_surname: ['',],
      nick_name: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  clickForm() {
    this.email = true;
  }

  registerFlag() {
    this.register = true;
  }

  //TODO: Agregar campos de escoger idioma tanto al metodo como al backend.

  registerEmail() {
    console.log('entra  -> ', this.formRegister.get('password').value + ' = ' + this.formRegister.get('password_confirmation').value);
    if (this.formRegister.get('name').value === '') {
      this.errorAlert('El nombre es requerido');
      return;
    }
    if (this.formRegister.get('password').value === '') {
      this.errorAlert('La contraseña es requerida');
      return;
    }
    if (this.formRegister.get('password').value.length < 8) {
      this.errorAlert('La contraseña debe tener mas de 8 caracteres');
      return;
    }
    if (this.formRegister.get('password').value !== this.formRegister.get('password_confirmation').value) {
      this.errorAlert('La contraseña no coincide');
      return;
    }
    console.log(this.formRegister.value);
    this.registerService.register(this.formRegister.value).subscribe(response => {
      console.log(response);
      if (response) {
        this.registerService.saveStorageTokenWizard(response);
        this.firebaseRegisterLogic(this.formRegister.value);
      }
    }, err => {
      console.log(err);
      const msg = err.error.message;
      this.errorAlert(msg);


    });
  }

  firebaseRegisterLogic(formResult) {

    const data = {
      email: formResult.email,
      password: formResult.password,
      nickName: formResult.nick_name
    };

    this.firebaseService.signup(data).then(res => { })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .catch(err => {
        console.log('error: ' + err.message);
      });

  }

  registerUser() {
    this.router.navigateByUrl('wizard');
  }

  async errorAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops!!',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
