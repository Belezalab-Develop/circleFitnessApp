import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-functioning',
  templateUrl: './functioning.page.html',
  styleUrls: ['./functioning.page.scss'],
})
export class FunctioningPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    //TODO: Agregar analitycs
    this.menu.close();
  }

}
