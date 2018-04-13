import { Component } from '@angular/core';
import { NavParams, IonicPage } from 'ionic-angular';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { NotificationService } from '../../services/notification.service';

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
        public navParams: NavParams,
        public notificationService: NotificationService,
        public restaurantService: RestaurantService) {
            this.id = this.navParams.data.id;

            this.restaurantService.getReviews(this.id).then(data => {
                this.reviews = data;
            })

            this.notificationService.loading();
        }

        showReview(i) {
            this.notificationService.showReview(this.reviews[i]);
        }

        newReview() {
            this.notificationService.newReview(this.id);
        }


    }
