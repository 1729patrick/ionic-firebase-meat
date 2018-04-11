import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { RestaurantService } from '../../providers/restaurant/restaurants.service';
import { Restaurant } from'../../providers/restaurant/restaurant.model';

@IonicPage()
@Component({
    selector: 'page-restaurant-detail',
    templateUrl: 'restaurant-detail.html',
})
export class RestaurantDetailPage {
    restaurant: Restaurant;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public restaurantService: RestaurantService) {

            let id = this.navParams.data.id; //pega o id do restaurante por parametro passado pela tab

            this.restaurantService.restaurantById(id)
            .subscribe(restaurant => {
                this.restaurant = restaurant;
            })
        }

    }
