import { Component } from '@angular/core';
import { MenuItem } from '../../services/cart/cart.model';
import { NavParams,IonicPage, LoadingController } from 'ionic-angular';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { NotificationService } from '../../services/notification.service';


@IonicPage()
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {
    menu: MenuItem[];

    constructor(
        public navParams: NavParams,
        public notificationService: NotificationService,
        public restaurantService: RestaurantService,
        public loadingCtrl: LoadingController) {

            let id = this.navParams.data.id; //pega o id do restaurante por parametro passado pela tab

            this.restaurantService.getMenuItems(id).then(data => {
                this.menu = data;
            })

            this.notificationService.loading();
        }

        confirmAdd(i): void {
            this.notificationService.confirmAdd(this.menu[i]);
        }
    }
