import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    //TODO: Agregar analitycs
    this.menu.close();
  }

}
