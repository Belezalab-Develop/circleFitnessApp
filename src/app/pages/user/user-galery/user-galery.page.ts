import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { AvatarService } from 'src/app/services/auxiliar/avatar.service';
import { CachingService } from 'src/app/services/auxiliar/caching.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-galery',
  templateUrl: './user-galery.page.html',
  styleUrls: ['./user-galery.page.scss'],
})
export class UserGaleryPage implements OnInit {

  userUid = null;
  profile = null;
  gallery: any;

  constructor(
    private userService: UserService,
    private storageService: CachingService,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private menu: MenuController,
  ) {
    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;
      this.avatarService.getUserProfile(this.userUid).subscribe((data) => {
        this.profile = data;
      });
      this.avatarService.getUserGallery(this.userUid).subscribe(data => {
        this.gallery = data;
        console.log(this.gallery);
      });

    });


  }

  ngOnInit() {
    this.menu.close();


  }

  async uploadImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.userGaleryImage(image, this.userUid);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Falla en la actualizacion',
          message: 'Existe un problema subiendo su imagen.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  async deleteImage(id){

    const alert = await this.alertController.create({
      header: 'Excluir imagem',
      message: 'Você quer deletar a imagem.',
      buttons: [
        {
          text: 'FECHAR',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        },
        {
          text: 'OK',
          role: 'confirm',
          cssClass: 'secondary',
          handler: (blah) => {
            this.avatarService.deleteUserGaleryImage(this.userUid, id);
          }
        }

      ],
    });
    await alert.present();

  }

}
