import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { RestaurantService } from '../../providers/restaurant/restaurants.service';


@IonicPage()
@Component({
    selector: 'page-reviews',
    templateUrl: 'reviews.html',
})
export class ReviewsPage {
    reviews: {
        name: string,
        comments: string,
        rating: string
    };
    id: string;


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public notificationProvider: NotificationProvider,
        public restaurantService: RestaurantService,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController) {
            this.id = this.navParams.data.id;

            this.restaurantService.restaurantReviews(this.id)
            .subscribe(reviews => {
                this.reviews = reviews;
            });
        }

        showReview(i) {
            this.notificationProvider.showReview(this.reviews[i]);
        }

        newReview() {
            this.notificationProvider.newReview(this.id);
        }
    }
