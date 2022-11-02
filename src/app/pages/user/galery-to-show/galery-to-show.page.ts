/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppAvailability } from '@awesome-cordova-plugins/app-availability/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { AvatarService } from 'src/app/services/auxiliar/avatar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-galery-to-show',
  templateUrl: './galery-to-show.page.html',
  styleUrls: ['./galery-to-show.page.scss'],
})
export class GaleryToShowPage implements OnInit {
  uid: string;
  email: string;
  custom_url: string;
  user: any;
  userImageUrl: string;
  gallery: any;

  constructor(
    private router: Router,
    public platform: Platform,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,
    private userService: UserService,
    private avatarService: AvatarService,

  ) {
    if (this.router.getCurrentNavigation() != null) {
      this.email = this.router.getCurrentNavigation().extras.state.email;
      this.userImageUrl = this.router.getCurrentNavigation().extras.state.photo_url;
      this.uid = this.router.getCurrentNavigation().extras.state.uid;
      this.user =  this.router.getCurrentNavigation().extras.state.user;

    }

    this.avatarService.getUserGallery(this.uid).subscribe(data => {
      this.gallery = data;
      console.log(this.gallery);
    });
  }

  ngOnInit() {
  }

}
