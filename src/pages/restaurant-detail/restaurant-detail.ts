import { Component } from '@angular/core';
import { NavParams, IonicPage } from 'ionic-angular';
import { Restaurant } from'../../services/restaurant/restaurant.model';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { NotificationService } from '../../services/notification.service';


@IonicPage()
@Component({
    selector: 'page-restaurant-detail',
    templateUrl: 'restaurant-detail.html',
})
export class RestaurantDetailPage {
    restaurant: Restaurant;
    time: boolean = false;

    constructor(
        public navParams: NavParams,
        public RestaurantService: RestaurantService,
        public notificationService: NotificationService) {

            let id = this.navParams.data.id; //pega o id do restaurante por parametro passado pela tab

            this.RestaurantService.getRestaurant(id).then((data) => {
                this.restaurant = data;
            })
        }

        ionViewCanEnter(){

            this.notificationService.loading();

            setTimeout(() => {
                this.time = true
            }, 600);
        }

    }
