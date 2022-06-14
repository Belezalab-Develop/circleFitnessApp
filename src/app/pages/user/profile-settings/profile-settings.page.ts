import { MenuController } from '@ionic/angular';
import { CachingService } from './../../../services/auxiliar/caching.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})
export class ProfileSettingsPage implements OnInit {

  user: any = {};
  form: any = {};

  slideOpts = {
    slidesPerView: 2.5,
  };

  constructor(
    private userService: UserService,
    private storageService: CachingService,
    private menu: MenuController
    ) { }

  ngOnInit() {
    //TODO: Agregar Analitycs.
    this.menu.close();
    this.getUser();
  }

  //TODO: Agregar metodo para subir imagen de perfil.

  getUser() {

    this.storageService.getStorage('user').then(user => {
      this.user = user;
      //TODO: realizar check de el porcentaje de grasa y el calculo para la edad.
      this.form = {
        gender: user.personal_information.gender,
        weight: user.personal_information.weight,
        height: user.personal_information.height,
        fat_percentage: user.personal_information.fat_percentage,
        looking_for: user.personal_information.looking_for,
        instagram: user.personal_information.instagram,
        bio: user.personal_information.bio,
        is_gender_visible: user.personal_information.is_gender_visible,
        is_looking_for_visible: user.personal_information.is_looking_for_visible,
        is_age_visible: user.personal_information.is_age_visible,
        is_weight_visible: user.personal_information.is_weight_visible,
        is_height_visible: user.personal_information.is_height_visible,
        is_fat_percentage_visible: user.personal_information.is_fat_percentage_visible,
        is_instagram_visible: user.personal_information.is_instagram_visible,
        is_workout_program_visible: user.personal_information.is_workout_program_visible,
        is_nutrition_program_visible: user.personal_information.is_nutrition_program_visible,
        are_photos_visible: user.personal_information.are_photos_visible,
      };
    }).catch(e => {
      console.log(e);
    });


  }

  updateUser() {

    //TODO: Aqui cuando realice el update, refrescar la informacion del user en el cache
    //TODO: Lanzar un alert para decir que todo salio bien en la actualizacion de los datos
    this.userService.updateUser(this.form).subscribe(user => {

    }, err => {
      console.log(err);
    });
  }

}
