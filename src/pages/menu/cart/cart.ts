import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { MenuItem } from '../../../services/cart/cart.model';
import { CartService } from '../../../services/cart/cart.service';
import { NotificationService } from '../../../services/notification.service';

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
        public notificationService: NotificationService,
        public loadingCtrl: LoadingController) {

            this.total = this.cartService.getTotal();
            this.items = this.cartService.item;


        }

        deleteItem(id):void {
            this.notificationService.messageDefault(`${this.items[id].name} removido do carrinho.`);
            this.cartService.deleteItem(id);
            this.total = this.cartService.getTotal();
        }

        newOrder() {
            this.navCtrl.push('OrderPage');
        }


    }
