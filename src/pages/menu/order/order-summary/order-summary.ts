import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-order-summary',
    templateUrl: 'order-summary.html',
})
export class OrderSummaryPage {

    constructor(
        public navCtrl: NavController) {
        }

        newReview() {
            this.navCtrl.setRoot('RestaurantsPage');
        }

    }
