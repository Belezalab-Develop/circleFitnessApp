import { AvatarService } from './../../services/auxiliar/avatar.service';
import { CachingService } from './../../services/auxiliar/caching.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/auxiliar/notifications.service';

@Component({
  selector: 'app-custom-tab',
  templateUrl: './custom-tab.component.html',
  styleUrls: ['./custom-tab.component.scss'],
})
export class CustomTabComponent implements OnInit {
  tabSelected = 0;
  userUid: any;
  profile= null;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    public notiService: NotificationsService,
    private storageService: CachingService,
    private avatarService: AvatarService,
  ) {




    this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;
      this.avatarService.getUserProfile(this.userUid).subscribe((data) => {
        this.profile = data;
      });

    });

    console.log('el perfil outside', this.profile);
  }

  ngOnInit() {

  }
  getUserNotiData() {
     this.storageService.getStorage('user_uid').then(res => {
      this.userUid = res;

      this.getUser();

    });
  }
  async getUser() {
    this.avatarService.getUserProfile(this.userUid).subscribe(res => {
      this.profile = res;

      console.log('el perfil inside', this.profile);

    });
  }
  goToExercise(): void {
    this.router.navigateByUrl('user-workout', { replaceUrl: true });
  }

  goToNutrition() {
    this.router.navigateByUrl('user-nutrition', { replaceUrl: true, state: { isFav: true, showMoreOptions: true } });
  }

  goToChat() {
    const badge = 0;
    this.avatarService.updatePrincipalBadge(this.profile.uid, badge);
    this.router.navigateByUrl('chats', { replaceUrl: true });

  }



}
