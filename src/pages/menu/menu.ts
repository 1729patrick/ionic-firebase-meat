import { CartService } from '../../providers/cart/cart.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../../providers/cart/cart.model';
import { NavController, NavParams, ToastController, AlertController,IonicPage } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { RestaurantService } from '../../providers/restaurant/restaurants.service';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {
    menu: MenuItem[];

    constructor(
        public alertCtrl: AlertController,
        public cartService: CartService,
        public httpClient: HttpClient,
        public navCtrl: NavController,
        public navParams: NavParams,
        public notificationProvider: NotificationProvider,
        public restaurantService: RestaurantService,
        public storage: Storage,
        public toastCtrl: ToastController) {

            let id = this.navParams.data.id; //pega o id do restaurante por parametro passado pela tab

            this.restaurantService.restaurantMenu(id)
            .subscribe(menu => this.menu = menu);
        }

        confirmAdd(i): void {
            this.notificationProvider.confirmAdd(this.menu[i]);
        }

    }
