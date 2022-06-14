import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-information',
  templateUrl: './app-information.page.html',
  styleUrls: ['./app-information.page.scss'],
})
export class AppInformationPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    //TODO: Agregar analitycs
    this.menu.close();
  }

}
