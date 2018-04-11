import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { RestaurantsPage } from '../restaurants/restaurants';


@IonicPage()
@Component({
    selector: 'page-order-summary',
    templateUrl: 'order-summary.html',
})
export class OrderSummaryPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) {
        }

        newReview() {
            this.navCtrl.setRoot(RestaurantsPage);
        }

    }
