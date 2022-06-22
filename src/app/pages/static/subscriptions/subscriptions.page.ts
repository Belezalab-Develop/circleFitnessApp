import { MenuController, Platform, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {
  products = [
    {
      id: 'sub_weekly_01',
      label: 'Semanal',
      price: 6.90,
    },
    {
      id: 'sub_monthly_01',
      label: 'Mensual',
      price: 19.90,
    },
    {
      id: 'sub_3months_01',
      label: '3 Meses',
      price: 39.90,
    },
  ];
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private alertController: AlertController,


  ) { }

  ngOnInit() {
    this.menu.close();
  }

  /* registerProducts() {
    this.products.forEach((product) => {
      this.store.register({
        id: product.id,
        type: this.store.PAID_SUBSCRIPTION,
      });
    });

    this.store.refresh();
  } */

  /* purchase(product: IAPProduct) {
    this.store.order(product).then(p => {
      // Purchase in progress!
    }, e => {
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  } */

  // To comply with AppStore rules
  /* restore() {
    this.store.refresh();
  } */

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
