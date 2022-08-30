/* eslint-disable @typescript-eslint/member-ordering */
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {

  constructor(
    public navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() { }

  @Output() goHome = new EventEmitter();

  goHomePage() {
    this.router.navigateByUrl('home-auth', {replaceUrl: true});
  }

}
