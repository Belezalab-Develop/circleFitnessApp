import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    //TODO: Agregar analitycs
    this.menu.close();
  }

}
