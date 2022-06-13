import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-custom-tab',
  templateUrl: './custom-tab.component.html',
  styleUrls: ['./custom-tab.component.scss'],
})
export class CustomTabComponent implements OnInit {
  tabSelected = 0;

  constructor(
    private navCtrl: NavController,
    private router: Router,
  ) { }

  ngOnInit() { }

  goToExercise() {
    this.router.navigateByUrl('/user-workout');
  }

  goToNutrition() {
    this.router.navigateByUrl('/user-nutritition', { state: { isFav: true, showMoreOptions: true } });
  }

  goToChat() {
    this.router.navigateByUrl('/chats');
  }



}
