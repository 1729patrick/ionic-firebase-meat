import { CartService } from '../../providers/cart/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuItem } from '../../providers/cart/cart.model';
import { NotificationProvider } from '../../providers/notification/notification';
import { OrderPage } from '../order/order';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {
    total: number;
    items: MenuItem[] = [];

    constructor(
        public cartService: CartService,
        public navCtrl: NavController,
        public navParams: NavParams,
        public notificationProvider: NotificationProvider,
        public storage: Storage) {

            this.total = this.cartService.getTotal();
            this.items = this.cartService.item;
        }

        deleteItem(id):void {
            this.notificationProvider.itemRemoved(this.items[id]);
            this.cartService.deleteItem(id);
            this.total = this.cartService.getTotal();
        }

        newOrder() {
            this.navCtrl.push(OrderPage);
        }


    }
