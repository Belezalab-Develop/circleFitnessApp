import { AvatarService } from './../../../services/auxiliar/avatar.service';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { CachingService } from './../../../services/auxiliar/caching.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})
export class ProfileSettingsPage implements OnInit {
  userUid = null;
  user: any = {};
  form: any = {};
  profile = null;
  showAge;



  constructor(
    private userService: UserService,
    private storageService: CachingService,
    private menu: MenuController,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;
      this.avatarService.getUserProfile(this.userUid).subscribe((data) => {
        this.profile = data;
        console.log(this.profile);
      });

    });
    this.presentLoadingDefault();

  }

  ngOnInit() {
    //TODO: Agregar Analitycs.

    this.menu.close();
    this.getUser();
  }


  getUser() {
    this.storageService.getStorage('user').then(user => {
      this.buildForm(user);
    }).catch(e => {
      console.log(e);
    });

  }

  ageCalculator(){
    if(this.user.personal_information.birthday){
      const convertAge = new Date(this.user.personal_information.birthday);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

    }
  }

  async updateUser() {
    this.userService.updateUser(this.form).subscribe(async () => {
      const loading = await this.loadingController.create({
        spinner: 'bubbles',
        message: 'Actualizando carregando as informações.'
      });
      loading.present();

      console.log('se actualizo');
      this.userService.getUser().subscribe(user => {
        console.log('se trajo nueva data');
        this.storageService.remove('user').then(() => {
          console.log('se removio el usuario');
          this.storageService.setStorage('user', user).then(us => {
            console.log('se actualizo el storage');
            this.buildForm(us);
            loading.dismiss();
          });
        });


      });
    });


  }

  buildForm(user) {
    this.user = user;
    //TODO: el calculo para la edad, agregar idioma de l aplicacion .
    this.form = {
      gender: this.user.personal_information.gender,
      weight: this.user.personal_information.weight,
      height: this.user.personal_information.height,
      fat_percentage: this.user.personal_information.fat_percentage,
      looking_for: this.user.personal_information.looking_for,
      instagram: this.user.personal_information.instagram,
      bio: this.user.personal_information.bio,
      is_gender_visible: this.user.personal_information.is_gender_visible,
      is_looking_for_visible: this.user.personal_information.is_looking_for_visible,
      is_age_visible: this.user.personal_information.is_age_visible,
      is_weight_visible: this.user.personal_information.is_weight_visible,
      is_height_visible: this.user.personal_information.is_height_visible,
      is_fat_percentage_visible: this.user.personal_information.is_fat_percentage_visible,
      is_instagram_visible: this.user.personal_information.is_instagram_visible,
      is_workout_program_visible: this.user.personal_information.is_workout_program_visible,
      is_nutrition_program_visible: this.user.personal_information.is_nutrition_program_visible,
      are_photos_visible: this.user.personal_information.are_photos_visible,
    };
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image, this.userUid);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Falla en la actualizacion',
          message: 'Existe un problema actualizando su avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }



  async presentLoadingDefault() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'carregando as informações.'


    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }

}
